import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttestationDialogComponent } from './add-attestation-dialog.component';

describe('AddAttestationDialogComponent', () => {
  let component: AddAttestationDialogComponent;
  let fixture: ComponentFixture<AddAttestationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAttestationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttestationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
