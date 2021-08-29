import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacesRoutingModule } from './races-routing.module';
import { RacesComponent } from './races.component';
import { SharedModule } from '../shared/shared.module';
import { RacesService } from './races.service';


@NgModule({
  declarations: [
    RacesComponent
  ],
  imports: [
    SharedModule,
    RacesRoutingModule
  ],
  providers: [RacesService]
})
export class RacesModule { }
