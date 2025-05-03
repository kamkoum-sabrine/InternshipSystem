import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAnnuleesTableComponent } from './non-annulees-table.component';

describe('NonAnnuleesTableComponent', () => {
  let component: NonAnnuleesTableComponent;
  let fixture: ComponentFixture<NonAnnuleesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAnnuleesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAnnuleesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
