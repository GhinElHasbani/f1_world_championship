import { NgModule, Provider } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { SpinnerService } from '../services/spinner.service';
import { SnackbarService } from '../services/snackbar.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CachingService } from '../services/caching.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/translation/', `.json?v=${new Date().getTime()}`);
}

@NgModule({
})
export class ServicesModule {
  static forShared(): Provider[] {
    return [
      LocalStorageService,
      SpinnerService,
      CachingService,
      TranslateService,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }).providers,
      SnackbarService
    ];
  }
}
