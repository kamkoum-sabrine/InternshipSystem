import { Component } from '@angular/core';
import {
  UtilisateursDownloadableExampleComponent
} from './utilisateurs-downloadable-example/utilisateurs-downloadable-example.component';
import {
  UtilisateursSelectableExampleComponent
} from './utilisateurs-selectable-example/utilisateurs-selectable-example.component';
import { UtilisateursBasicExampleComponent } from './utilisateurs-basic-example/utilisateurs-basic-example.component';
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
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, UtilisateursBasicExampleComponent, UtilisateursSelectableExampleComponent, UtilisateursDownloadableExampleComponent]
})
export class UtilisateursComponent {
}
