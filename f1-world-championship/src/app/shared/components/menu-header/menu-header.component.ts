import { EventEmitter, Output, Component, OnInit, Input, ViewChild } from '@angular/core';
import { MenuItem } from '../sidenav-menu/menu-items.model';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'f1app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.sass']
})
export class MenuHeaderComponent implements OnInit {
  @Output() menuIconClick: EventEmitter<any> = new EventEmitter();
  @Input() menuItems: MenuItem[] = [];
  @Input() info: string;
  public displayMenu: boolean = false;
  @ViewChild(SidenavMenuComponent) sidenavMenuComp: SidenavMenuComponent;


  constructor() { }

  ngOnInit(): void {
  }

  public clickMenuIcon() {
    this.displayMenu = !this.displayMenu;
    if (window.innerWidth < 768) {
      this.sidenavMenuComp.toggleNav();
    }
    this.menuIconClick.emit();
  }

}
