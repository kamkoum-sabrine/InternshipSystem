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
  isComiteChef: boolean = false;
  stats: any;
  isLoading = true;

  // Options pour les chartes
  statusChartOptions: any;
  typeChartOptions: any;
  validationChartOptions: any;
  dureeChartOptions: any;

  // Configuration du graphique
  // Dans votre composant
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6c757d',
          font: {
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#2c3e50',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#495057',
          font: {
            weight: 500
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#6c757d'
        }
      }
    }
  };

  barChartData = {
    labels: ['Stage été', 'PFE', 'Stage ouvrier', 'International'],
    datasets: [
      {
        label: 'Nombre de conventions',
        data: [65, 59, 30, 18],
        backgroundColor: [
          'rgba(120, 0, 0, 0.7)',  // Rouge bordeaux
          'rgba(44, 62, 80, 0.7)',  // Bleu ardoise
          'rgba(52, 152, 219, 0.7)', // Bleu vif
          'rgba(22, 160, 133, 0.7)'  // Vert émeraude
        ],
        borderColor: [
          'rgba(120, 0, 0, 1)',
          'rgba(44, 62, 80, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(22, 160, 133, 1)'
        ],
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };
  constructor(private statisticsService: StatistiquesService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = user?.role?.nom || '';

    // Détermine le type d'utilisateur
    this.isSuperAdmin = this.role === 'SUPER_ADMINISTRATEUR';
    this.isServiceStage = this.role === 'SERVICE_STAGE';
    this.isDirectionEnicar = this.role === 'DIRECTION_ENICAR';
    this.isComiteChef = this.role === 'COMITE_CHEF_DEPARTEMENT';
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
        if (this.isEtudiant) {
          this.loadEtudiantData();
        }

        else {
          if (this.isComiteChef) {
            this.loadComiteChefData();

          }
          else {
            this.loadDefaultData();

          }
        }
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
  private loadEtudiantData(): void {
    // Charger des données spécifiques pour SUPER_ADMIN
    console.log('Chargement des données Super Admin');

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

  private loadComiteChefData(): void {
    // Charger des données spécifiques pour ADMIN
    console.log('Chargement des données de comite pedagogique');
    this.isLoading = true;
    this.statisticsService.getStats().subscribe(data => {
      this.stats = data;
      this.initChartsComite();
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

  initChartsComite(): void {
    // Chart 1: Statut des conventions
    this.statusChartOptions = {
      series: [
        this.stats.conventionsSigneesComiteChef,
        this.stats.conventionsEnAttenteComiteChef,
        this.stats.conventionsRefuseesComiteChef
      ],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['Signées', 'En attente', 'Refusées'],
      title: {
        text: 'Statut des conventions'
      },
      colors: ['#669bbc', '#ffc300', '#780000']
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
  initChartsDirection(): void {
    // Définition des couleurs harmonisées
    const palette = {
      red: '#780000',
      darkBlue: '#003049',
      mediumBlue: '#669bbc',
      lightBlue: '#a8d0e6',
      green: '#2e8b57',
      purple: '#5e4b8b',
      yellow: '#ffc300'
    };

    // Chart 1: Statut des conventions (Pie Chart)
    this.statusChartOptions = {
      series: [
        this.stats.conventionsSigneesDirection,
        this.stats.conventionsEnAttenteDirection,
        this.stats.conventionsRefuseesDirection
      ],
      chart: {
        type: 'pie',
        height: 350,
        foreColor: '#333' // Couleur du texte
      },
      labels: ['Signées', 'En attente', 'Refusées'],
      title: {
        text: 'Statut des conventions',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: palette.darkBlue
        }
      },
      colors: [palette.darkBlue, palette.lightBlue, palette.red],
      legend: {
        position: 'bottom',
        markers: {
          radius: 3
        }
      },
      dataLabels: {
        style: {
          fontSize: '12px',
          fontWeight: '500'
        }
      }
    };

    // Chart 2: Répartition par type (Donut Chart)
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
        text: 'Répartition par type de stage',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: palette.darkBlue
        }
      },
      colors: [palette.red, palette.lightBlue],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                color: palette.darkBlue
              }
            }
          }
        }
      },
      legend: {
        position: 'bottom'
      }
    };

    // Chart 3: Taux de validation (Bar Chart Horizontal)
    this.validationChartOptions = {
      series: [{
        name: 'Taux de validation',
        data: [
          this.stats.tauxValidationService,
          this.stats.tauxValidationDirection,
          this.stats.tauxValidationComiteChef,
          // this.stats.tauxValidationComite
        ]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          dataLabels: {
            position: 'center'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toFixed(1) + '%',
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: ['Service', 'Direction', 'Comité pédagogique'],
        max: 100,
        labels: {
          style: {
            colors: palette.darkBlue
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: palette.darkBlue,
            fontSize: '12px'
          }
        }
      },
      title: {
        text: 'Taux de validation par service',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: palette.darkBlue
        }
      },
      colors: [palette.red],
      grid: {
        borderColor: '#f1f1f1'
      }
    };

    // Chart 4: Durée moyenne (Bar Chart Vertical)
    this.dureeChartOptions = {
      series: [{
        name: 'Durée moyenne',
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
        formatter: (val: number) => val.toFixed(1) + ' jours',
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: ['Stage été', 'Stage PFE'],
        labels: {
          style: {
            colors: palette.darkBlue
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: palette.darkBlue
          }
        }
      },
      title: {
        text: 'Durée moyenne des stages',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: palette.darkBlue
        }
      },
      colors: [palette.mediumBlue],
      grid: {
        borderColor: '#f1f1f1'
      }
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
