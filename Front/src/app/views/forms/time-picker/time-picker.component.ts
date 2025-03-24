import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  DropdownCloseDirective,
  RowComponent,
  TemplateIdDirective,
  TextColorDirective,
  TimePickerComponent as TimePickerComponent_1
} from '@coreui/angular-pro';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TimePickerComponent_1, TemplateIdDirective, ButtonDirective, DropdownCloseDirective]
})
export class TimePickerComponent {

  time? = new Date();

}
