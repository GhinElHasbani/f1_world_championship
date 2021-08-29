import { NgModule, Provider } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    exports: [
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule
    ],
    providers: []
})
export class MaterialModule {
    static forServices(): Provider[] {
        return [];
    }
}
