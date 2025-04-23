import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsDirectionEnicarBasicExampleComponent } from './conventionsDirectionEnicar-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ConventionsDirectionEnicarBasicExampleComponent', () => {
  let component: ConventionsDirectionEnicarBasicExampleComponent;
  let fixture: ComponentFixture<ConventionsDirectionEnicarBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, ConventionsDirectionEnicarBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionsDirectionEnicarBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
