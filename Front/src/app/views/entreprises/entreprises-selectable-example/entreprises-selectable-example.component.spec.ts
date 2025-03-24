import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule, BadgeModule, SmartTableModule } from '@coreui/angular-pro';
import { EntreprisesSelectableExampleComponent } from './entreprises-selectable-example.component';

describe('EntreprisesSelectableExampleComponent', () => {
  let component: EntreprisesSelectableExampleComponent;
  let fixture: ComponentFixture<EntreprisesSelectableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertModule, SmartTableModule, BadgeModule, NoopAnimationsModule, EntreprisesSelectableExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisesSelectableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
