import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule, BadgeModule, SmartTableModule } from '@coreui/angular-pro';
import { SoutenancesSelectableExampleComponent } from './soutenances-selectable-example.component';

describe('SoutenancesSelectableExampleComponent', () => {
  let component: SoutenancesSelectableExampleComponent;
  let fixture: ComponentFixture<SoutenancesSelectableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertModule, SmartTableModule, BadgeModule, NoopAnimationsModule, SoutenancesSelectableExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenancesSelectableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
