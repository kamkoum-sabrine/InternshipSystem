import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  BadgeComponent,
  ButtonDirective,
  CollapseDirective,
  IColumn,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conventionsEtudiant-basic-example',
  templateUrl: './conventionsEtudiant-basic-example.component.html',
  styleUrls: ['./conventionsEtudiant-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class ConventionsEtudiantBasicExampleComponent implements OnInit {
  // Variables et méthodes à implémenter
  myConventions: any[] = [];
  columns: IColumn[] = [];
  details_visible: any = {};

  @ViewChild('annulationModal') annulationModal!: TemplateRef<any>;
  selectedFile: File | null = null;
  currentConventionId: number | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Initialisation à implémenter
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Gestion des changements à implémenter
  }

  // Méthodes à implémenter
  getBadge(status: number): string {
    return '';
  }

  getDate(dateDepot: any): string {
    return '';
  }

  downloadPDF(nomFichier: string): void {
  }

  downloadPreuveAnnulation(nomFichier: string): void {
  }

  toggleDetails(itemId: number): void {
  }

  openAnnulationModal(conventionId: number): void {
  }

  onFileSelected(event: any): void {
  }

  uploadPreuveAnnulation(modal: any): void {
  }
}