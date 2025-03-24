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
import Swal from 'sweetalert2';

import usersData from '../_data';
import { GererSoutenancesService } from './gerer-soutenances.service';

@Component({
  selector: 'app-soutenances-basic-example',
  templateUrl: './soutenances-basic-example.component.html',
  styleUrls: ['./soutenances-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class SoutenancesBasicExampleComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    console.log('Valeur reçue du parent:', this.users);

  }



}



