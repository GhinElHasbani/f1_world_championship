import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseClass } from '../../shared/bases/http-base.class';
import { PageChangeEvent } from '../../shared/models/backend';

@Injectable()
export class ModulesService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  getModuleList(series: string, season: number, module: string, paginationObj: PageChangeEvent) {
    return this.get(`${series}/${season}/${module}`, this.setAndGetParams(paginationObj));
  }

  getModuleTop1(series: string, season: number, round: number) {
    return this.get(`${series}/${season}/${round}/results/1/qualifying`);
  }
}
