import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'f1app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public f1LogoTemplate = "<img src='https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg' />";

  constructor(private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }


}
