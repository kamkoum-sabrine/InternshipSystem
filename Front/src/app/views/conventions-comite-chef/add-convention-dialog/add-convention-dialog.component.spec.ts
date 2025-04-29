import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConventionDialogComponent } from './add-convention-dialog.component';

describe('AddConventionDialogComponent', () => {
  let component: AddConventionDialogComponent;
  let fixture: ComponentFixture<AddConventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConventionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
