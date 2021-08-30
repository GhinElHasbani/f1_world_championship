import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpersBaseClass } from '../../shared/bases/helpers-base.class';
import { PageChangeEvent } from '../../shared/models/backend';
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
  currentSeries: any;

  constructor(
    private _seasonsService: SeasonsService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    const thisYear = (new Date()).getFullYear();
    this.seasonsList = this.languageHelper.generateListFromTo(this.startYear, thisYear).sort((a, b) => b - a).map(m => { return { Season: m } });
    this.route.params.subscribe(p => {
      this.currentSeries = p['series'];
      this.getWinnersBySeason(this.currentSeries, this.seasonsList);
    })
  }

  getWinnersBySeason(currentSeries, seasonsList) {
    seasonsList.forEach(s => {
      this.getSubscription = this._seasonsService.getSeasonWinner(currentSeries, s.Season).subscribe(data => {
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
  }

  goToRaceDetails(season) {
    this.router.navigate([`home/${this.currentSeries}/${season}/races`]);
  }

  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription]);
  }

}
