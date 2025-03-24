import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import {
  AvatarComponent,
  BorderDirective,
  ButtonCloseDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarToggleDirective,
  TabDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-default-aside',
  templateUrl: './default-aside.component.html',
  styleUrls: ['./default-aside.component.scss'],
  standalone: true,
  imports: [SidebarComponent, SidebarHeaderComponent, RouterLink, IconDirective, ThemeDirective, ButtonCloseDirective, SidebarToggleDirective, NgTemplateOutlet, ListGroupDirective, ListGroupItemDirective, BorderDirective, TextColorDirective, AvatarComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ProgressBarDirective, ProgressComponent, TabsComponent, TabsListComponent, TabDirective, TabsContentComponent, TabPanelComponent]
})
export class DefaultAsideComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  public messages = Array.from({ length: 5 }, (v, i) => i);

  ngAfterViewInit(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
  }
}
