import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule, BadgeModule, SmartTableModule } from '@coreui/angular-pro';
import { UtilisateursSelectableExampleComponent } from './utilisateurs-selectable-example.component';

describe('UtilisateursSelectableExampleComponent', () => {
  let component: UtilisateursSelectableExampleComponent;
  let fixture: ComponentFixture<UtilisateursSelectableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertModule, SmartTableModule, BadgeModule, NoopAnimationsModule, UtilisateursSelectableExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursSelectableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
