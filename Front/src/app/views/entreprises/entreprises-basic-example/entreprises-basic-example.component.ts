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
import { GererEntreprisesService } from './gerer-entreprises.service';

@Component({
  selector: 'app-entreprises-basic-example',
  templateUrl: './entreprises-basic-example.component.html',
  styleUrls: ['./entreprises-basic-example.component.scss'],
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonDirective, CollapseDirective, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class EntreprisesBasicExampleComponent implements OnInit {

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



