// conventions-service-stage.component.ts
import { Component, OnInit } from '@angular/core';
import { ConventionService } from './convention.service'; // Chemin correct
import { 
  CardBodyComponent, 
  CardComponent, 
  CardHeaderComponent,
  ColComponent, 
  RowComponent 
} from '@coreui/angular-pro';
import { SmartTableConventionsComponent } from './smart-table-conventions/smart-table-conventions.component';
@Component({
  selector: 'app-conventions-service-stage',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent,
    SmartTableConventionsComponent // Ajouté ici
  ],
  templateUrl: './conventions-service-stage.component.html'
})
export class ConventionsServiceStageComponent implements OnInit {

  conventions: any[] = [];

  constructor(private conventionService: ConventionService) {}

  ngOnInit(): void {
    this.loadConventions();
  }

  loadConventions(): void {
    this.conventionService.getConventions().subscribe({
      next: (data) => this.conventions = data,
      error: (err) => console.error('Erreur:', err)
    });
  }
}