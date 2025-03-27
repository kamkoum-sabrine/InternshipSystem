import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherJuryDialogComponent } from './afficher-jury-dialog.component';

describe('AfficherJuryDialogComponent', () => {
  let component: AfficherJuryDialogComponent;
  let fixture: ComponentFixture<AfficherJuryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherJuryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherJuryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
