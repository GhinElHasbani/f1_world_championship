import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';
import { ModulesComponent } from './modules/modules.component';
import { ModulesService } from './modules/modules.service';


@NgModule({
  declarations: [
    HomeComponent,
    ModulesComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [HomeService, ModulesService]
})

export class HomeModule { }
