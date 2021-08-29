import { Component, Injector, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaceModel } from './race.model';
import { DataTableBaseClass } from '../shared/bases/data-table-base.class';
import { RaceService } from './race.service';
import { PageChangeEvent } from '../shared/models/backend';
import { seriesListingDatatableColumnDefinition } from './race.config';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.sass']
})

export class RaceComponent extends DataTableBaseClass<RaceModel> implements OnInit {
  dataTableColumnsDefinition = seriesListingDatatableColumnDefinition;
  getSubscription: Subscription;

  constructor(protected injector: Injector, private _raceService: RaceService) { 
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
    this.getSubscription = this._raceService.getServiesList(this.getPaginationParam(paginationObj)).subscribe(data => {
      this.setDataTableData(data, 'RaceTable.Races')
    }, err => {

    });
  }


  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }
}
