import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseClass } from '../shared/bases/http-base.class';
import { APP_SERIES } from '../shared/constants';
import { PageChangeEvent } from '../shared/models/backend';

@Injectable()
export class RacesService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  getRacesList(season: number, paginationObj: PageChangeEvent) {
    return this.get(`${APP_SERIES}/${season}/races`, this.setAndGetParams(paginationObj));
  }
}
