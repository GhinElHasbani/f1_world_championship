import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_SERIES } from '../shared/constants';
import { LandingComponent } from './landing.component';
import { SeasonsComponent } from './seasons/seasons.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      { path: '', redirectTo: APP_SERIES },
      { path: ':series', component: SeasonsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
