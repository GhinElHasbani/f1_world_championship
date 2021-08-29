import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaceModel } from './races.model';
import { DataTableBaseClass } from '../shared/bases/data-table-base.class';
import { RacesService } from './races.service';
import { PageChangeEvent } from '../shared/models/backend';
import { racesListingDatatableColumnDefinition } from './races.config';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.sass']
})

export class RacesComponent extends DataTableBaseClass<RaceModel> implements OnInit, OnDestroy {
  dataTableColumnsDefinition = racesListingDatatableColumnDefinition;
  getSubscription: Subscription;

  constructor(protected injector: Injector, private _raceService: RacesService) { 
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
    this.getSubscription = this._raceService.getRacesList(this.getPaginationParam(paginationObj)).subscribe(data => {
      this.setDataTableData(data, 'RaceTable.Races')
    }, err => {

    });
  }


  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }
}
