import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsEtudiantBasicExampleComponent } from './conventionsEtudiant-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ConventionsEtudiantBasicExampleComponent', () => {
  let component: ConventionsEtudiantBasicExampleComponent;
  let fixture: ComponentFixture<ConventionsEtudiantBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, ConventionsEtudiantBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionsEtudiantBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
