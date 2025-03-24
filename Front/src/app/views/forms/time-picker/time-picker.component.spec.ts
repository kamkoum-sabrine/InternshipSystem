import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CardModule, GridModule, TimePickerModule } from '@coreui/angular-pro';
import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardModule, GridModule, RouterTestingModule, TimePickerModule, TimePickerComponent]
})
      .compileComponents();

    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
