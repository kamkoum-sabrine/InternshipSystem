// smart-table-conventions.component.ts
import { Component, Input } from '@angular/core';
import { 
  BadgeComponent,
  ButtonDirective,
  SmartTableComponent
} from '@coreui/angular-pro';

@Component({
  selector: 'app-smart-table-conventions',
  standalone: true,
  imports: [SmartTableComponent, BadgeComponent, ButtonDirective],
  templateUrl: './smart-table-conventions.component.html'
})
export class SmartTableConventionsComponent {
  @Input() conventions: any[] = [];

  columns = [
    { key: 'etudiant.nom', label: 'Étudiant' },
    { key: 'dateDepot', label: 'Date dépôt' },
    { key: 'valideeService', label: 'Statut Service' },
    { key: 'valideeDirection', label: 'Statut Direction' },
    { key: 'actions', label: 'Actions' }
  ];

  getBadge(status: number): string {
    switch (status) {
      case 1: return 'success';
      case -1: return 'danger';
      default: return 'warning';
    }
  }
}