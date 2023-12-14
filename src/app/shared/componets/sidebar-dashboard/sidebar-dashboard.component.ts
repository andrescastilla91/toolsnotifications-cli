import { Component } from '@angular/core';
import { modelSidebarMenu } from 'src/app/models/shared/sidebar-dashboard.models';
import { ROUTES_MENU } from './sidebar-conf';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.scss']
})
export class SidebarDashboardComponent {

  protected menuItems: Array<modelSidebarMenu> = ROUTES_MENU;
}
