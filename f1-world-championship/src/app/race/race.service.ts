import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseClass } from '../shared/bases/http-base.class';
import { PageChangeEvent } from '../shared/models/backend';

@Injectable()
export class RaceService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  getServiesList(paginationObj: PageChangeEvent) {
    return this.get('f1/races', this.setAndGetParams(paginationObj));
  }
}
