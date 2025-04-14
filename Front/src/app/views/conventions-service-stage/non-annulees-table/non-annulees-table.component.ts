import { Component, OnInit } from '@angular/core';
import { NonAnnuleesService } from '../non-annulees.service';
import { SmartTableComponent } from '@coreui/angular-pro';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  ViewEncapsulation } from '@angular/core';

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
  private lastClickedId: number | null = null;
private doubleClickTimeout: any = null;
  // Ajout des variables pour afficher le message utilisateur
  userMessage: string = '';  // Contenu du message
  showUserMessage: boolean = false;  // Contrôle l'affichage du message

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
      console.log('🔍 Transform item:', item);
      return {
        ...item,
        id: item.idConvention || item.id,  // Utiliser idConvention ou item.id comme ID
        etudiantFullName: `${item.etudiant?.nom} ${item.etudiant?.prenom}`,
        preuveNom: item.preuveAnnulationNom
      };
    });
  }

  
  onRowClick(event: any): void {
    const conventionId = event.item.id; // Assurez-vous que votre item a bien un id
    
    if (this.lastClickedId === conventionId) {
      // Double-clic détecté
      console.log('Double-clic détecté sur la convention:', event.item);
      this.selectedItem = event.item;
      this.showModal = true;
      this.lastClickedId = null;
      clearTimeout(this.doubleClickTimeout);
    } else {
      // Premier clic
      this.lastClickedId = conventionId;
      
      // On set un timeout pour réinitialiser après un délai
      if (this.doubleClickTimeout) {
        clearTimeout(this.doubleClickTimeout);
      }
      
      this.doubleClickTimeout = setTimeout(() => {
        this.lastClickedId = null;
      }, 300); // Délai de 300ms pour considérer un double-clic
    }
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
        this.userMessage = 'Preuve validée avec succès.';  // Message pour l'utilisateur
        this.showUserMessage = true;  // Affiche le message
        this.closeModal();
        this.loadConventions();
        setTimeout(() => {
          this.showUserMessage = false;  // Masque le message après 3 secondes
        }, 3000);
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
        this.userMessage = 'Preuve refusée.';  // Message pour l'utilisateur
        this.showUserMessage = true;  // Affiche le message
        this.closeModal();
        this.loadConventions();
        setTimeout(() => {
          this.showUserMessage = false;  // Masque le message après 3 secondes
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Erreur refus:', err);
        this.isProcessing = false;
      }
    });
  }
  downloadPDF(fileName: string): void {
    if (!fileName) return;
  
    const url = `http://localhost:8081/api/conventionStagEte/downloadPreuve/${fileName}`;
  
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement de la preuve :', err);
      }
    });
  }
  
  
  
  
}