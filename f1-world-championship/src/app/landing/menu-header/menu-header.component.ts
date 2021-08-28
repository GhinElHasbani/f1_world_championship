import { EventEmitter, Output, Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../sidenav-menu/menu-items.model';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.sass']
})
export class MenuHeaderComponent implements OnInit {
  @Output() menuIconClick: EventEmitter<any> = new EventEmitter();
  @Input() menuItems: MenuItem[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  public clickMenuIcon() {
    this.menuIconClick.emit();
  }

}
