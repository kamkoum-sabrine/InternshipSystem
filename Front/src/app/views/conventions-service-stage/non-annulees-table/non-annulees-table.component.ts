import { Component, OnInit } from '@angular/core';
import { NonAnnuleesService } from '../non-annulees.service';
import { SmartTableComponent } from '@coreui/angular-pro';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-non-annulees-table',
  standalone: true,
  imports: [CommonModule, SmartTableComponent],
  templateUrl: './non-annulees-table.component.html'
})
export class NonAnnuleesTableComponent implements OnInit {
  conventions: any[] = [];
  isLoading = true;
  showModal = false;
  isProcessing = false;
  selectedItem: any = null;

  columns = [
    { 
      key: 'etudiantFullName', 
      label: 'Étudiant',
      _style: { width: '50%' }
    },
    { 
      key: 'preuveNom', 
      label: 'Preuve d\'annulation',
      _style: { width: '50%' }
    }
  ];

  constructor(private service: NonAnnuleesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadConventions();
  }

  loadConventions(): void {
    this.service.getConventionsNonAnnulees().subscribe({
      next: (data) => {
        console.log('Données reçues:', JSON.parse(JSON.stringify(data)));
        this.conventions = this.transformData(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.isLoading = false;
      }
    });
  }

  private transformData(data: any[]): any[] {
    return data.map(item => {
      console.log('🔍 Transform item:', item); // ← Ajoute ce log pour chaque item
      return {
        ...item,
        id: item.idConvention || item.id, // Utiliser idConvention ou item.id comme ID
        etudiantFullName: `${item.etudiant?.nom} ${item.etudiant?.prenom}`,
        preuveNom: item.preuveAnnulationNom
      };
    });
  }
  
  
  
  
  

  downloadPDF(fileName: string): void {
    const url = `http://localhost:8081/api/conventionStagEte/uploads/${fileName}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement :', err);
      }
    });
  }

  onRowClick(event: any): void {
    console.log('🧪 selectedItem:', event.item);  // Vérifie ici le contenu de l'élément
    this.selectedItem = event.item; // Assure-toi que l'élément est bien récupéré
    this.showModal = true;
  }
  
  
  
  

  closeModal(): void {
    this.showModal = false;
    this.selectedItem = null;
    this.isProcessing = false;
  }

  validerConvention(): void {
    if (!this.selectedItem) {
      console.warn('⚠️ Aucun élément sélectionné !');
      return;
    }
  
    const conventionId = this.selectedItem?.id;
    if (!conventionId) {
      console.error('❌ ID convention introuvable dans selectedItem');
      return;
    }
  
    this.isProcessing = true;
  
    this.service.annulerConvention(conventionId).subscribe({
      next: (response: string) => {
        console.log('✅ Convention annulée avec succès:', response);
        this.closeModal();
        this.loadConventions();
      },
      error: (err) => {
        console.error('❌ Erreur validation:', err);
        this.isProcessing = false;
      }
    });
  }
  
  
  
  
  
  

  refuserConvention(): void {
    if (!this.selectedItem) {
      console.warn('⚠️ Aucun élément sélectionné !');
      return;
    }
  
    const conventionId = this.selectedItem?.id;
    if (!conventionId) {
      console.error('❌ ID convention introuvable dans selectedItem');
      return;
    }
  
    this.isProcessing = true;
  
    this.service.refuserAnnulation(conventionId).subscribe({
      next: (response: string) => {
        console.log('✅ Annulation refusée avec succès:', response);
        this.closeModal();
        this.loadConventions();
      },
      error: (err) => {
        console.error('❌ Erreur refus:', err);
        this.isProcessing = false;
      }
    });
  }
  
}
