import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisesBasicExampleComponent } from './entreprises-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('EntreprisesBasicExampleComponent', () => {
  let component: EntreprisesBasicExampleComponent;
  let fixture: ComponentFixture<EntreprisesBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, EntreprisesBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisesBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
