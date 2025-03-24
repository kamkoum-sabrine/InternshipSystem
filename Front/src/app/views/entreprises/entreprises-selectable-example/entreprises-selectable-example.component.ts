import { Component, Input, OnInit } from '@angular/core';
import {
  AlertComponent,
  BadgeComponent,
  SmartTableComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';
import usersData from '../_data';

@Component({
  selector: 'app-entreprises-selectable-example',
  templateUrl: './entreprises-selectable-example.component.html',
  styleUrls: ['./entreprises-selectable-example.component.scss'],
  standalone: true,
  imports: [AlertComponent, BadgeComponent, SmartTableComponent, TemplateIdDirective, TextColorDirective]
})
export class EntreprisesSelectableExampleComponent implements OnInit {

  constructor() { }

  usersData = usersData;
  @Input() users: any;
  selectedItems = [2, 3];
  columns = [
    {
      key: 'nom',
      _style: { width: '10vw', minWidth: '10vw', maxWidth: '10vw' }
    },
    {
      key: 'prenom',
      _style: { width: '10vw', minWidth: '10vw', maxWidth: '10vw' }
    },
    'createdAt',
    'role',
    'active'
  ];

  ngOnInit(): void {
    this.usersData = this.usersData.map((item, id) => {
      const _selected = this.selectedItems.includes(id);
      return {
        ...item,
        _selected
      };
    });
  }

  checkSelected = (selectedItems: any) => {
    this.selectedItems = selectedItems.map((item: { id: any; }) => item.id);
  };

  getBadge(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Pending':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  }
}
