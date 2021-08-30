import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseClass } from '../shared/bases/http-base.class';
import { APP_SERIES } from '../shared/constants';
import { PageChangeEvent } from '../shared/models/backend';

@Injectable()
export class SeasonsService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  getSeasonWinner(season: number) {
    return this.get(`${APP_SERIES}/${season}/last/results/1/qualifying`, undefined, undefined, undefined, true);
  }

  getDriverPhoto(driverName: string){
    return this.get(`api.php?action=query&titles=${driverName}&prop=pageimages&format=json&pithumbsize=100&origin=*`, undefined, undefined, 'https://en.wikipedia.org/w/', true)
  }
}
