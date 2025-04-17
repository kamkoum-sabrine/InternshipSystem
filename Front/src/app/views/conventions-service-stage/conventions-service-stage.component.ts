import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConventionService } from './convention.service';
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
    SmartTableConventionsComponent
  ],
  templateUrl: './conventions-service-stage.component.html'
})
export class ConventionsServiceStageComponent implements OnInit {
  @ViewChild('navButton', {static: false}) navButton!: ElementRef<HTMLButtonElement>;
  conventions: any[] = [];

  constructor(
    private conventionService: ConventionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConventions();
  }

  handleNavigationClick() {
    console.log('Bouton cliqué - Début de la navigation');
    
    if (this.navButton && this.navButton.nativeElement) {
      const routerLink = this.navButton.nativeElement.getAttribute('routerLink');
      console.log('routerLink détecté:', routerLink);

      if (routerLink) {
        this.router.navigate([routerLink]).then(success => {
          console.log('Navigation réussie?', success);
        }).catch(err => {
          console.error('Erreur de navigation:', err);
        });
      }
    }
  }

  loadConventions(): void {
    this.conventionService.getConventions().subscribe({
      next: (data) => this.conventions = data,
      error: (err) => console.error('Erreur:', err)
    });
  }
}