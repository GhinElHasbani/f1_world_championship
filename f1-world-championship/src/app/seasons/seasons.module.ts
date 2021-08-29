import { NgModule } from '@angular/core';
import { SeasonsRoutingModule } from './seasons-routing.module';
import { SeasonsComponent } from './seasons.component';
import { SeasonsService } from './seasons.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SeasonsComponent
  ],
  imports: [
    SharedModule,
    SeasonsRoutingModule
  ],
  providers: [
    SeasonsService
  ]
})
export class SeasonsModule { }
