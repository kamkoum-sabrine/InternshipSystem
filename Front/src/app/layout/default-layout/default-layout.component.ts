import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonCloseDirective,
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular-pro';

import { DefaultAsideComponent, DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems, INavDataExtended } from './_nav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [SidebarComponent, SidebarHeaderComponent, SidebarBrandComponent, RouterLink, IconDirective, NgScrollbar, SidebarNavComponent, SidebarFooterComponent, SidebarToggleDirective, SidebarTogglerDirective, DefaultAsideComponent, DefaultHeaderComponent, ShadowOnScrollDirective, ContainerComponent, RouterOutlet, DefaultFooterComponent, ButtonCloseDirective, FontAwesomeModule]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public filteredNavItems: INavDataExtended[] = [];
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user?.role?.nom || '';  // Extrait le nom du rôle
    console.log('Rôle utilisateur :', role);

    this.filteredNavItems = navItems.filter(item =>
      !item.roles || item.roles.includes(role)
    );
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }

}
