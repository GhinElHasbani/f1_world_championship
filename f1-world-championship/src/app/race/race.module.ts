import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaceRoutingModule } from './race-routing.module';
import { RaceComponent } from './race.component';
import { SharedModule } from '../shared/shared.module';
import { RaceService } from './race.service';


@NgModule({
  declarations: [
    RaceComponent
  ],
  imports: [
    SharedModule,
    RaceRoutingModule
  ],
  providers: [RaceService]
})
export class RaceModule { }
