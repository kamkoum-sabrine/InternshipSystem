import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first

import { FullCalendarNgComponent } from './full-calendar-ng.component';
import { CardModule } from '@coreui/angular-pro';

describe('FullCalendarNgComponent', () => {
  let component: FullCalendarNgComponent;
  let fixture: ComponentFixture<FullCalendarNgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [FullCalendarModule, CardModule, FullCalendarNgComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCalendarNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
