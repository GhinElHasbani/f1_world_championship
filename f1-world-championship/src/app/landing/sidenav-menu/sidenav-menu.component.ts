import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from './menu-items.model';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.sass']
})
export class SidenavMenuComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input() menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public toggleNav() {
    this.sidenav.toggle();
  }

}
