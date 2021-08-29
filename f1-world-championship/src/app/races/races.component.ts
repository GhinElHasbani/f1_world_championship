import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaceModel } from './races.model';
import { DataTableBaseClass } from '../shared/bases/data-table-base.class';
import { RacesService } from './races.service';
import { PageChangeEvent } from '../shared/models/backend';
import { racesListingDatatableColumnDefinition } from './races.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.sass']
})

export class RacesComponent extends DataTableBaseClass<RaceModel> implements OnInit, OnDestroy {
  dataTableColumnsDefinition = racesListingDatatableColumnDefinition;
  getSubscription: Subscription;
  season = 2021;

  constructor(protected injector: Injector,
    private _raceService: RacesService) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.season = p.season;
      this.getListing(this.season, this.paginatorConfig);
    })

  }

  onPage(pageChangeEvent: PageChangeEvent) {
    if (this.isPaginatorEnabled()) {
      this.getListing(this.season, pageChangeEvent);
    }
  }

  getListing(season: number, paginationObj?: PageChangeEvent) {
    this.getSubscription = this._raceService.getRacesList(season, this.getPaginationParam(paginationObj)).subscribe(data => {
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
