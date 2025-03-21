import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  DateRangePickerComponent as DateRangePickerComponent_1,
  DropdownCloseDirective,
  RowComponent,
  TemplateIdDirective,
  TextColorDirective
} from '@coreui/angular-pro';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, DateRangePickerComponent_1, TemplateIdDirective, ButtonDirective, DropdownCloseDirective, DatePipe]
})
export class DateRangePickerComponent implements OnInit {

  constructor() { }

  public calendar = new Date();
  public startDate: Date | null = new Date(this.calendar);
  public endDate: Date | null = new Date(this.calendar.getFullYear(), this.calendar.getMonth(), this.calendar.getDate() + 7);

  public dateDisabledExample = new Date(2024, 1, 1);
  public disabledDates = [
    [new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth(), 4), new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth(), 7)],
    new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth(), 16),
    new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth() + 1, 16),
    [new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth() + 2, 2), new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth() + 2, 8)]
  ];
  public minDate = new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth() - 2, 1);
  public maxDate = new Date(this.dateDisabledExample.getFullYear(), this.dateDisabledExample.getMonth() + 4, 0);

  public customRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1))
    ],
    'Last 7 Days': [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(new Date())
    ],
    'Last 30 Days': [
      new Date(new Date().setDate(new Date().getDate() - 29)),
      new Date(new Date())
    ],
    'This Month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ],
    'Last Month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    ]
  };

  onToday() {
    this.calendar = new Date();
  }

  onCancel() {
    this.startDate = null;
    this.endDate = null;
  }

  ngOnInit(): void {
  }

}
