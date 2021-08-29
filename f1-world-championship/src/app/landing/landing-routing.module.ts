import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      { path: '', redirectTo: 'seasons' },
      { path: 'seasons', loadChildren: () => import('../seasons/seasons.module').then(m => m.SeasonsModule) },
      { path: 'races', loadChildren: () => import('../races/races.module').then(m => m.RacesModule) },
      { path: 'circuits', loadChildren: () => import('../races/races.module').then(m => m.RacesModule) },
      { path: 'drivers', loadChildren: () => import('../races/races.module').then(m => m.RacesModule) },
      { path: 'constructors', loadChildren: () => import('../races/races.module').then(m => m.RacesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
