import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTablesBasicExampleComponent } from './smart-tables-basic-example.component';
import { BadgeModule, ButtonModule, SmartTableModule } from '@coreui/angular-pro';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SmartTablesBasicExampleComponent', () => {
  let component: SmartTablesBasicExampleComponent;
  let fixture: ComponentFixture<SmartTablesBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableModule, ButtonModule, BadgeModule, SmartTablesBasicExampleComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTablesBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
