import { Component } from '@angular/core';
import {
  SmartTablesDownloadableExampleComponent
} from './smart-tables-downloadable-example/smart-tables-downloadable-example.component';
import {
  SmartTablesSelectableExampleComponent
} from './smart-tables-selectable-example/smart-tables-selectable-example.component';
import { SmartTablesBasicExampleComponent } from './smart-tables-basic-example/smart-tables-basic-example.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';
import { DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-smart-tables',
  templateUrl: './smart-tables.component.html',
  styleUrls: ['./smart-tables.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, SmartTablesBasicExampleComponent, SmartTablesSelectableExampleComponent, SmartTablesDownloadableExampleComponent]
})
export class SmartTablesComponent {
}
