import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { StatistiquesService } from '../widgets/widgets-dropdown/statistiques.service'
// import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

import { NgApexchartsModule } from 'ng-apexcharts';
interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [WidgetsDropdownComponent, NgApexchartsModule, CommonModule, BaseChartDirective, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit {

  role: string = '';
  isSuperAdmin: boolean = false;
  isServiceStage: boolean = false;
  isEtudiant: boolean = false;
  isDirectionEnicar: boolean = false;
  stats: any;
  isLoading = true;

  // Options pour les chartes
  statusChartOptions: any;
  typeChartOptions: any;
  validationChartOptions: any;
  dureeChartOptions: any;

  // Configuration du graphique
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Répartition des étudiants par filière',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Informatique', 'Mécatronique', 'Infotronique', 'GSIL'],
    datasets: [{
      data: [65, 59, 80, 81],
      label: 'Nombre d\'étudiants',
      backgroundColor: [
        'rgba(103, 58, 183, 0.7)',
        'rgba(233, 30, 99, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(0, 188, 212, 0.7)'
      ],
      borderColor: [
        'rgba(103, 58, 183, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(0, 188, 212, 1)'
      ],
      borderWidth: 1
    }]
  };
  constructor(private statisticsService: StatistiquesService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user?.role?.nom || '';

    // Détermine le type d'utilisateur
    this.isSuperAdmin = this.role === 'SUPER_ADMINISTRATEUR';
    this.isServiceStage = this.role === 'SERVICE_STAGE';
    this.isDirectionEnicar = this.role === 'DIRECTION_ENICAR';

    this.isEtudiant = this.role === 'ETUDIANT';

    console.log('Rôle utilisateur :', this.role);
    console.log("isSuperAdmin " + this.isSuperAdmin)
    this.loadData();
  }

  loadData(): void {
    // Chargement des données selon le rôle
    if (this.isSuperAdmin) {
      this.loadSuperAdminData();
    } else if (this.isServiceStage) {
      this.loadServiceData();
    } else {
      if (this.isDirectionEnicar) {
        this.loadDirectionData();
      }
      else {
        this.loadDefaultData();
      }
    }
  }

  private loadSuperAdminData(): void {
    // Charger des données spécifiques pour SUPER_ADMIN
    console.log('Chargement des données Super Admin');
    this.statisticsService.getStudentDistribution().subscribe({
      next: (data) => {
        this.processChartData(data.byFiliere);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données:', err);
      }
    });
  }

  private loadServiceData(): void {
    // Charger des données spécifiques pour ADMIN
    console.log('Chargement des données de service de stage');
    this.isLoading = true;
    this.statisticsService.getStats().subscribe(data => {
      this.stats = data;
      this.initCharts();
      this.isLoading = false;
    });
  }

  private loadDirectionData(): void {
    // Charger des données spécifiques pour ADMIN
    console.log('Chargement des données de service de stage');
    this.isLoading = true;
    this.statisticsService.getStats().subscribe(data => {
      this.stats = data;
      this.initChartsDirection();
      this.isLoading = false;
    });
  }

  initChartsDirection(): void {
    // Chart 1: Statut des conventions
    this.statusChartOptions = {
      series: [
        this.stats.conventionsSigneesDirection,
        this.stats.conventionsEnAttenteDirection,
        this.stats.conventionsRefuseesDirection
      ],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['Signées', 'En attente', 'Refusées'],
      title: {
        text: 'Statut des conventions'
      },
      colors: ['#4CAF50', '#FFC107', '#F44336']
    };

    // Chart 2: Répartition par type
    this.typeChartOptions = {
      series: [
        this.stats.stageEteCount,
        this.stats.stagePFECount,
      ],
      chart: {
        type: 'donut',
        height: 350
      },
      labels: ['Stage été', 'Stage PFE'],
      title: {
        text: 'Répartition par type de stage'
      },
      colors: ['#2196F3', '#9C27B0']
    };

    // Chart 3: Taux de validation
    this.validationChartOptions = {
      series: [{
        name: 'Taux de validation',
        data: [
          this.stats.tauxValidationService,
          this.stats.tauxValidationDirection,
          this.stats.tauxValidationChefDepartement,
          this.stats.tauxValidationComite
        ]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toFixed(1) + '%'
      },
      xaxis: {
        categories: ['Service', 'Direction', 'Chef Département', 'Comité'],
        max: 100
      },
      title: {
        text: 'Taux de validation par service'
      },
      colors: ['#673AB7']
    };

    // Chart 4: Durée moyenne
    this.dureeChartOptions = {
      series: [{
        name: 'Durée moyenne (jours)',
        data: [
          this.stats.dureeMoyenneEte,
          this.stats.dureeMoyennePFE
        ]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '45%',
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toFixed(1) + ' jours'
      },
      xaxis: {
        categories: ['Stage été', 'Stage PFE']
      },
      title: {
        text: 'Durée moyenne des stages'
      },
      colors: ['#009688']
    };
  }
  initCharts(): void {
    // Chart 1: Statut des conventions
    this.statusChartOptions = {
      series: [
        this.stats.conventionsSignees,
        this.stats.conventionsEnAttente,
        this.stats.conventionsRefusees
      ],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['Signées', 'En attente', 'Refusées'],
      title: {
        text: 'Statut des conventions'
      },
      colors: ['#4CAF50', '#FFC107', '#F44336']
    };

    // Chart 2: Répartition par type
    this.typeChartOptions = {
      series: [
        this.stats.stageEteCount,
        this.stats.stagePFECount,
      ],
      chart: {
        type: 'donut',
        height: 350
      },
      labels: ['Stage été', 'Stage PFE'],
      title: {
        text: 'Répartition par type de stage'
      },
      colors: ['#2196F3', '#9C27B0']
    };

    // Chart 3: Taux de validation
    this.validationChartOptions = {
      series: [{
        name: 'Taux de validation',
        data: [
          this.stats.tauxValidationService,
          this.stats.tauxValidationDirection,
          this.stats.tauxValidationChefDepartement,
          this.stats.tauxValidationComite
        ]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toFixed(1) + '%'
      },
      xaxis: {
        categories: ['Service', 'Direction', 'Chef Département', 'Comité'],
        max: 100
      },
      title: {
        text: 'Taux de validation par service'
      },
      colors: ['#673AB7']
    };

    // Chart 4: Durée moyenne
    this.dureeChartOptions = {
      series: [{
        name: 'Durée moyenne (jours)',
        data: [
          this.stats.dureeMoyenneEte,
          this.stats.dureeMoyennePFE
        ]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '45%',
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toFixed(1) + ' jours'
      },
      xaxis: {
        categories: ['Stage été', 'Stage PFE']
      },
      title: {
        text: 'Durée moyenne des stages'
      },
      colors: ['#009688']
    };
  }
  private loadDefaultData(): void {
    // Charger des données par défaut pour les autres rôles
    console.log('Chargement des données par défaut');
  }


  private processChartData(filiereData: any): void {
    const labels = Object.keys(filiereData);
    const values = Object.values(filiereData);

    this.barChartData = {
      labels: labels,
      datasets: [{
        ...this.barChartData.datasets[0],
        data: values as number[]
      }]
    };
  }
}
