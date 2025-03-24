import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenancesBasicExampleComponent } from './soutenances-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe(' SoutenancesBasicExampleComponent', () => {
  let component: SoutenancesBasicExampleComponent;
  let fixture: ComponentFixture<SoutenancesBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, SoutenancesBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenancesBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
