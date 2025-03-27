import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnseignantDialogComponent } from './add-enseignant-dialog.component';

describe('AddEnseignantDialogComponent', () => {
  let component: AddEnseignantDialogComponent;
  let fixture: ComponentFixture<AddEnseignantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnseignantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnseignantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
