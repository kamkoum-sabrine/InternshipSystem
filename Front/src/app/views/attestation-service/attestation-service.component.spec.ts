import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationServiceComponent } from './attestation-service.component';

describe('AttestationServiceComponent', () => {
  let component: AttestationServiceComponent;
  let fixture: ComponentFixture<AttestationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttestationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
