import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableBaseClass } from '../shared/bases/data-table-base.class';
import { PageChangeEvent } from '../shared/models/backend';
import { seasonsListingDatatableColumnDefinition } from './seasons.config';
import { SeasonModel } from './seasons.model';
import { SeasonsService } from './seasons.service';

@Component({
  selector: 'f1app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.sass']
})
export class SeasonsComponent extends DataTableBaseClass<SeasonModel> implements OnInit, OnDestroy {
  dataTableColumnsDefinition = seasonsListingDatatableColumnDefinition;
  getSubscription: Subscription;

  constructor(
    protected injector: Injector,
    private _seasonsService: SeasonsService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getListing(this.paginatorConfig);
  }

  onPage(pageChangeEvent: PageChangeEvent) {
    if (this.isPaginatorEnabled()) {
      this.getListing(pageChangeEvent);
    }
  }

  getListing(paginationObj?: PageChangeEvent) {
    this.getSubscription = this._seasonsService.getRacesList(this.getPaginationParam(paginationObj)).subscribe(data => {
      this.setDataTableData(data, 'SeasonTable.Seasons')
    }, err => {

    });
  }


  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }

}
