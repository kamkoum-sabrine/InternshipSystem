import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsServiceBasicExampleComponent } from './conventionsService-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ConventionsServiceBasicExampleComponent', () => {
  let component: ConventionsServiceBasicExampleComponent;
  let fixture: ComponentFixture<ConventionsServiceBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, ConventionsServiceBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionsServiceBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
