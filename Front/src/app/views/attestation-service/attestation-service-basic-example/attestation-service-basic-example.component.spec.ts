import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationServiceBasicExampleComponent } from './attestation-service-basic-example.component';

describe('AttestationServiceBasicExampleComponent', () => {
  let component: AttestationServiceBasicExampleComponent;
  let fixture: ComponentFixture<AttestationServiceBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationServiceBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttestationServiceBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
