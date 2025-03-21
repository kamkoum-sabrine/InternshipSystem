import { Component, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  BadgeComponent,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonToolbarComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-mail-toolbar',
  templateUrl: './mail-toolbar.component.html',
  styleUrls: ['./mail-toolbar.component.scss'],
  standalone: true,
  imports: [ButtonToolbarComponent, ButtonGroupComponent, ButtonDirective, IconDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, RouterLink, DropdownMenuDirective, DropdownItemDirective, TextColorDirective, BadgeComponent]
})
export class MailToolbarComponent {
  @HostBinding('class') hostClass = 'btn-toolbar mb-4';
}
