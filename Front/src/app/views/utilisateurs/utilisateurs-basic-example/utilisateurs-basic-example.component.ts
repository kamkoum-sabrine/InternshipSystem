import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  BadgeComponent,
  ButtonDirective,
  CollapseDirective,
  IColumn,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import usersData from '../_data';

@Component({
  selector: 'app-utilisateurs-basic-example',
  templateUrl: './utilisateurs-basic-example.component.html',
  styleUrls: ['./utilisateurs-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class UtilisateursBasicExampleComponent implements OnInit {

  usersData = usersData;
  @Input() users: any[] = [];;

  columns: IColumn[] = [

    {
      key: 'nom',
      label: 'Nom',
    },
    {
      key: 'prenom'
    },

    // {
    //   key: 'createdAt',
    //   label: 'Date Registered',
    //   _props: { class: 'text-truncate' }
    // },
    { key: 'role', _style: { width: '20%' } },
    { key: 'active', _style: { width: '15%' } },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];
  details_visible = Object.create({});

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      console.log('Nouvelle valeur de users :', this.users);
      this.cdr.detectChanges(); // Force la mise à jour de la vue
    }
  }
  ngOnInit() {
    console.log('Valeur reçue du parent:', this.users);

  }
  getItem(item: any) {
    console.log("item " + item)
  }
  getBadge(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'primary';
    }
  }

  toggleDetails(itemId: number) {
    console.log("Avant :", this.details_visible[itemId]);

    // Initialiser à false si non défini, puis inverser
    this.details_visible[itemId] = !this.details_visible[itemId];

    console.log("Après :", this.details_visible[itemId]);
  }

}
