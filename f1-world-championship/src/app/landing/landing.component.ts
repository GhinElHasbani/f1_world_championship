import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { landingMenuItems } from './landing.config';
import { SidenavMenuComponent } from '../shared/components/sidenav-menu/sidenav-menu.component';
import { Router } from '@angular/router';
import { APP_SERIES } from '../shared/constants';

@Component({
  selector: 'f1app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate([`${APP_SERIES}`]);
  }

}
