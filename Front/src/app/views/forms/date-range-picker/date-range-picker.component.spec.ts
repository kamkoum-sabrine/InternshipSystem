import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CardModule, GridModule, DateRangePickerModule } from '@coreui/angular-pro';
import { DateRangePickerComponent } from './date-range-picker.component';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardModule, GridModule, RouterTestingModule, DateRangePickerModule, DateRangePickerComponent]
})
      .compileComponents();

    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
