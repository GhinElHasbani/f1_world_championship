import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { LandingService } from './landing.service';
import { LandingRoutingModule } from './landing-routing.module';
import { SeasonsComponent } from './seasons/seasons.component';
import { SeasonsService } from './seasons/seasons.service';


@NgModule({
  declarations: [
    LandingComponent,
    SeasonsComponent
  ],
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  providers: [LandingService, SeasonsService]
})

export class LandingModule { }
