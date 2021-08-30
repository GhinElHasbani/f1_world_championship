import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
  {
    path: ':series/:season', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'races' },
      { path: ':module', component: ModulesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
