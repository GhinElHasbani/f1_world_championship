import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RacesComponent } from './races/races.component';

const routes: Routes = [
  {
    path: ':series/:season', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'races' },
      { path: 'races', component: RacesComponent },
      { path: 'circuits', component: RacesComponent },
      { path: 'drivers', component: RacesComponent },
      { path: 'constructors', component: RacesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
