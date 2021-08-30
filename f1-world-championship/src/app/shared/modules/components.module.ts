import { NgModule } from '@angular/core';
import { SidenavMenuComponent } from 'src/app/shared/components/sidenav-menu/sidenav-menu.component';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { MenuHeaderComponent } from '../components/menu-header/menu-header.component';
import { ThirdPartiesModule } from './third-parties.module';

@NgModule({
    imports: [
        ThirdPartiesModule,
    ],
    entryComponents: [
    ],
    declarations: [
        DataTableComponent,
        SidenavMenuComponent,
        MenuHeaderComponent
    ],
    exports: [
        ThirdPartiesModule,
        DataTableComponent,
        SidenavMenuComponent,
        MenuHeaderComponent
    ]
})
export class ComponentsModule { }

