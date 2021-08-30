import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaceModel } from './races.model';
import { DataTableBaseClass } from '../../shared/bases/data-table-base.class';
import { RacesService } from './races.service';
import { PageChangeEvent } from '../../shared/models/backend';
import { racesListingDatatableColumnDefinition } from './races.config';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'f1app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.sass']
})

export class RacesComponent extends DataTableBaseClass<RaceModel> implements OnInit, OnDestroy {
  dataTableColumnsDefinition = racesListingDatatableColumnDefinition;
  getSubscription: Subscription;
  season: number;
  series: string;

  constructor(protected injector: Injector,
    private _raceService: RacesService,
    private sectionService: SectionService) {
    super(injector);
    this.sectionService.getSection().subscribe(s => {
      this.season = s.season;
      this.series = s.series;
      this.getListing(this.series, this.season, this.paginatorConfig);
    })
  }

  ngOnInit(): void {
  }

  onPage(pageChangeEvent: PageChangeEvent) {
    if (this.isPaginatorEnabled()) {
      this.getListing(this.series, this.season, pageChangeEvent);
    }
  }

  getListing(series: string, season: number, paginationObj?: PageChangeEvent) {
    this.getSubscription = this._raceService.getRacesList(series, season, this.getPaginationParam(paginationObj)).subscribe(data => {
      if (data) {
        this.setDataTableData(data, 'RaceTable.Races')
      }
    }, err => {

    });
  }


  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }
}
