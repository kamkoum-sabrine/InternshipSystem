import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAnnuleesListComponent } from './non-annulees-list.component';

describe('NonAnnuleesListComponent', () => {
  let component: NonAnnuleesListComponent;
  let fixture: ComponentFixture<NonAnnuleesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAnnuleesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAnnuleesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
