import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InboxMessageComponent } from '../inbox-message/inbox-message.component';
import { MailToolbarComponent } from '../mail-toolbar/mail-toolbar.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TextColorDirective } from '@coreui/angular-pro';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, MailToolbarComponent, InboxMessageComponent, RouterLink]
})
export class InboxComponent {}
