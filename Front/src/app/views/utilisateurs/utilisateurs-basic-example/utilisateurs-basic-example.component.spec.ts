import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursBasicExampleComponent } from './utilisateurs-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('UtilisateursBasicExampleComponent', () => {
  let component: UtilisateursBasicExampleComponent;
  let fixture: ComponentFixture<UtilisateursBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, UtilisateursBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
