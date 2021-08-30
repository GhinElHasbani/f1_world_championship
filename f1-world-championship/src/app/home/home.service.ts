import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseClass } from 'src/app/shared/bases/http-base.class';

@Injectable()
export class HomeService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }



}
