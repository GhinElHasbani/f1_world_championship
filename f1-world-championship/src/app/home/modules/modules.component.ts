import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleConfig, RaceModel } from './modules.model';
import { DataTableBaseClass } from '../../shared/bases/data-table-base.class';
import { ModulesService } from './modules.service';
import { PageChangeEvent } from '../../shared/models/backend';
import { MODULES_CONFIG } from './modules.config';
import { SectionService } from 'src/app/shared/services/section.service';
import { DataTableColumnDefinition } from 'src/app/shared/models/frontend';

@Component({
  selector: 'f1app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.sass']
})

export class ModulesComponent extends DataTableBaseClass<RaceModel> implements OnInit, OnDestroy {
  //need to handle
  moduleConfig: ModuleConfig;
  dataTableColumnsDefinition: DataTableColumnDefinition[];
  getSubscription: Subscription;
  season: number;
  series: string;
  currentModule: string;

  constructor(protected injector: Injector,
    private _modulesService: ModulesService,
    private sectionService: SectionService) {
    super(injector);
    this.sectionService.getSection().subscribe(s => {
      this.season = s.season;
      this.series = s.series;
      this.route.params.subscribe(p => {
        this.currentModule = p['module'];
        this.moduleConfig = MODULES_CONFIG.find(m => m.name === this.currentModule);
        if (this.moduleConfig) {
          this.dataTableColumnsDefinition = this.moduleConfig.columnDef;
          this.getListing(this.paginatorConfig);
        }
      })
    })
  }

  ngOnInit(): void {
  }

  onPage(pageChangeEvent: PageChangeEvent) {
    if (this.isPaginatorEnabled()) {
      this.getListing(pageChangeEvent);
    }
  }

  getListing(paginationObj?: PageChangeEvent) {
    this.getSubscription = this._modulesService.getModuleList(this.series, this.season, this.currentModule, this.getPaginationParam(paginationObj)).subscribe(data => {
      if (data) {
        this.setDataTableData(data, this.moduleConfig.propNameInApi)
      }
    }, err => {

    });
  }


  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }
}
