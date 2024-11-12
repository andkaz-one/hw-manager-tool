import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public isCollapsed = input.required<boolean>();

  public menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-line',
      routerLink: 'dashboard',
      routerLinkActiveOptions: {exacly: true}
    },
    {
      label: 'Hardware',
      icon: 'pi pi-microchip',
      routerLink: 'hardware',
      routerLinkActiveOptions: {exacly: true}
    },
    // {
    //   routeLink: 'pages',
    //   icon: 'fal fa-file',
    //   label: 'Pages',
    // },

  ];



}
