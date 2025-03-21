import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TextColorDirective } from '@coreui/angular-pro';
import { DocsLinkComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-full-calendar-ng',
  templateUrl: './full-calendar-ng.component.html',
  styleUrls: ['./full-calendar-ng.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardHeaderComponent, DocsLinkComponent, CardBodyComponent, FullCalendarModule]
})
export class FullCalendarNgComponent implements OnInit, AfterViewInit {

  constructor() {}

  today = new Date();
  todayStr: string = this.today.toISOString().replace(/T.*$/, '');
  viewTime = '17:00';
  events = [
    {
      title: 'event 1',
      start: this.todayStr + 'T08:00:00',
      end: this.todayStr + 'T10:30:00',
      color: 'black'
    },
    {
      title: 'event 2',
      start: this.todayStr + 'T17:00:00',
      end: this.todayStr + 'T18:30:00'
    },
    {
      start: addDays(startOfDay(this.today), 1),
      end: addDays(endOfDay(this.today), 3),
      title: 'A 2 day event',
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      listPlugin,
      timeGridPlugin
    ],
    initialDate: this.todayStr,
    weekNumberCalculation: 'ISO',
    height: 'auto',
    contentHeight: 'auto',
    // aspectRatio: 2,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    editable: true,
    selectable: true,
    droppable: true,
    navLinks: true,
    events: this.events,
    themeSystem: 'bootstrap5'
  };
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  ngOnInit(): void {}

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    setTimeout(() => {
      calendarApi.updateSize();
    }, 1000);
  }
}
