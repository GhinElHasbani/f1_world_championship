import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseClass } from 'src/app/shared/bases/http-base.class';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PageChangeEvent } from '../shared/models/backend';

@Injectable()
export class LandingService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  getServiesList(paginationObj: PageChangeEvent) {
    return this.get('f1', this.setAndGetParams(paginationObj));
  }

}
