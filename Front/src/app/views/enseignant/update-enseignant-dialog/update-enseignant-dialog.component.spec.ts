import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnseignantDialogComponent } from './update-enseignant-dialog.component';

describe('UpdateEnseignantDialogComponent', () => {
  let component: UpdateEnseignantDialogComponent;
  let fixture: ComponentFixture<UpdateEnseignantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEnseignantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEnseignantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
