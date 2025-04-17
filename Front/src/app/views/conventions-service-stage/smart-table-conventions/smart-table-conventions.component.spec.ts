import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableConventionsComponent } from './smart-table-conventions.component';

describe('SmartTableConventionsComponent', () => {
  let component: SmartTableConventionsComponent;
  let fixture: ComponentFixture<SmartTableConventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartTableConventionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartTableConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
