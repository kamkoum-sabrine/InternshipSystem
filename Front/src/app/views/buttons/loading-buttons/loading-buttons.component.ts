import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  LoadingButtonComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-loading-buttons',
  templateUrl: './loading-buttons.component.html',
  styleUrls: ['./loading-buttons.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, LoadingButtonComponent]
})
export class LoadingButtonsComponent {

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

  public loading = new Array(36);

  onClick(idx: number) {

    if (!!this.loading[idx]) {
      clearTimeout(this.loading[idx]);
      this.loading[idx] = undefined;
    } else {
      this.loading[idx] = setTimeout(() => {
        this.loading[idx] = undefined;
      }, 3000);
    }
  }
}
