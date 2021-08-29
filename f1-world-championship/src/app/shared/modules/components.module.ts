import { NgModule } from '@angular/core';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { ThirdPartiesModule } from './third-parties.module';

@NgModule({
    imports: [
        ThirdPartiesModule
    ],
    entryComponents: [
    ],
    declarations: [
        DataTableComponent
    ],
    exports: [
        ThirdPartiesModule,
        DataTableComponent
    ]
})
export class ComponentsModule { }

