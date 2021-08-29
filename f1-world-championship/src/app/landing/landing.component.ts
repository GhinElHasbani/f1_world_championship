import { Component, OnInit, ViewChild } from '@angular/core';
import { landingMenuItems } from './landing.config';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  @ViewChild(SidenavMenuComponent) sidenavMenuComp: SidenavMenuComponent;
  public menuItems = landingMenuItems;

  constructor() {
  }

  ngOnInit(): void {
  }

  menuIconClick() {
    this.sidenavMenuComp.toggleNav();
  }

}
