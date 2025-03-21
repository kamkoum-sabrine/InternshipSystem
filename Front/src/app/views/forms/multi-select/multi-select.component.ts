import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  MultiSelectComponent as MultiSelectComponent_1,
  MultiSelectOptgroupComponent,
  MultiSelectOptionComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, MultiSelectComponent_1, MultiSelectOptionComponent, MultiSelectOptgroupComponent]
})
export class MultiSelectComponent {}
