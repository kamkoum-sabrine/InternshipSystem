import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { MailToolbarComponent } from '../mail-toolbar/mail-toolbar.component';
import {
  BadgeComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  TextColorDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, MailToolbarComponent, IconDirective, BadgeComponent, ButtonDirective]
})
export class MessageComponent {}
