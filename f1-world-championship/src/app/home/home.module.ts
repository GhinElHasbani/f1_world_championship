import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';
import { RacesService } from './races/races.service';
import { RacesComponent } from './races/races.component';


@NgModule({
  declarations: [
    HomeComponent,
    RacesComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [HomeService, RacesService]
})

export class HomeModule { }
