import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule, BadgeModule, SmartTableModule } from '@coreui/angular-pro';
import { SmartTablesSelectableExampleComponent } from './smart-tables-selectable-example.component';

describe('SmartTablesSelectableExampleComponent', () => {
  let component: SmartTablesSelectableExampleComponent;
  let fixture: ComponentFixture<SmartTablesSelectableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlertModule, SmartTableModule, BadgeModule, NoopAnimationsModule, SmartTablesSelectableExampleComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTablesSelectableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
