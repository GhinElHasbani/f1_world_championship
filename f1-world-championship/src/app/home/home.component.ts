import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SectionService } from '../shared/services/section.service';
import { homeMenuItems } from './home.config';

@Component({
  selector: 'f1app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  public menuItems = homeMenuItems;
  public displayMenu: boolean = false;
  small: boolean;
  getRouteSubscription: Subscription;
  currentSeason: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]).subscribe(result => {
      this.small = result.matches;
    });
    this.getRouteSubscription = this.route.params.subscribe(p => {
      if (p['season'] || p['series']) {
        this.currentSeason = p['season'];
        this.sectionService.sendSection({ season: p['season'], series: p['series'] })
        this.updateMenuItemsLinks(p['series'], p['season']);
      }
    });
  }

  private updateMenuItemsLinks(series, season) {
    this.menuItems.forEach(m => {
      m.link = m.link.replace(':series', series);
      m.link = m.link.replace(':season', season);
    });

  }

  menuIconClick() {
    this.displayMenu = !this.displayMenu;
  }

  ngOnDestroy() {
    if (this.getRouteSubscription) { this.getRouteSubscription.unsubscribe(); }
  }

}
