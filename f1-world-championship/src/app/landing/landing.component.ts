import { AfterViewInit, Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { DataTableBaseClass } from '../shared/bases/data-table-base.class';
import { DataTableComponent } from '../shared/components/data-table/data-table.component';
import { PageChangeEvent } from '../shared/models/backend';
import { landingMenuItems, seriesListingDatatableColumnDefinition } from './landing.config';
import { SesonsModel } from './landing.model';
import { LandingService } from './landing.service';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent extends DataTableBaseClass<SesonsModel> implements OnInit, AfterViewInit {

  @ViewChild(SidenavMenuComponent) sidenavMenuComp: SidenavMenuComponent;

  dataTableColumnsDefinition = seriesListingDatatableColumnDefinition;
  public menuItems = landingMenuItems;

  constructor(protected injector: Injector, private landingService: LandingService) {
    super(injector);
  }

  ngAfterViewInit() {


  }

  onPage(pageChangeEvent: PageChangeEvent) {
    if (this.isPaginatorEnabled()) {
      this.getListing()
    }
  }

  getListing(paginationObj?: PageChangeEvent) {
    this.landingService.getServiesList(paginationObj ?? this.getDataTableRequestPayload()).subscribe(data => {
      this.setDataTableData(data, 'RaceTable.Races')
    }, err => {

    });
  }

  ngOnInit(): void {
    this.getListing();
  }

  menuIconClick() {
    this.sidenavMenuComp.toggleNav();
  }

}
