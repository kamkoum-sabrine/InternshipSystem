import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardHeaderComponent, ButtonDirective, IconDirective, CardBodyComponent, RowComponent, ColComponent, TableDirective]
})
export class InvoiceComponent {

  print($event: MouseEvent) {
    $event.preventDefault();
    window && window.print();
  }

}
