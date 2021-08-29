import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpersBaseClass } from '../shared/bases/helpers-base.class';
import { PageChangeEvent } from '../shared/models/backend';
import { SeasonModel } from './seasons.model';
import { SeasonsService } from './seasons.service';

@Component({
  selector: 'f1app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.sass']
})
export class SeasonsComponent extends HelpersBaseClass implements OnInit, OnDestroy {
  private startYear = 2015;
  public seasonsList: SeasonModel[] = [];
  getSubscription: Subscription;

  constructor(
    private _seasonsService: SeasonsService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    const thisYear = (new Date()).getFullYear();
    this.seasonsList = this.languageHelper.generateListFromTo(this.startYear, thisYear).map(m => { return { Season: m } });
    this.getWinnersBySeason(this.seasonsList);
    console.log(this.seasonsList);
  }

  getWinnersBySeason(seasonsList) {
    seasonsList.forEach(s => {
      this.getSubscription = this._seasonsService.getSeasonWinner(s.Season).subscribe(data => {
        if (data) {
          s.Races = data.body.MRData.RaceTable.Races;
          const driverUrl = s.Races[0].QualifyingResults[0].Driver.url;
          if (driverUrl) {
            const nameOnWiki = driverUrl?.slice(driverUrl?.lastIndexOf('/') + 1);
            this._seasonsService.getDriverPhoto(nameOnWiki).subscribe(i => {
              const pageId = Object.keys(i.body.query.pages);
              s.Races[0].QualifyingResults[0].Driver.image = i.body.query.pages[pageId[0]].thumbnail.source;
            });
          }
        }
      });
    });
    console.log(seasonsList);
  }

  goToRaceDetails(season) {
    this.router.navigate(['races'], { queryParams: { season: season } });
  }

  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }

}
