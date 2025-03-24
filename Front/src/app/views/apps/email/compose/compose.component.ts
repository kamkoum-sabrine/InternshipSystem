import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  BadgeComponent,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonToolbarComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ColDirective,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  RowComponent,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, ColComponent, FormControlDirective, RowComponent, ButtonToolbarComponent, ButtonDirective, IconDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, RouterLink, DropdownMenuDirective, DropdownItemDirective, BadgeComponent, ColDirective, ButtonGroupComponent]
})
export class ComposeComponent {}
