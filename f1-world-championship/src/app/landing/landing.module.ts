import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { LandingService } from './landing.service';
import { LandingRoutingModule } from './landing-routing.module';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  providers: [LandingService]
})

export class LandingModule { }
