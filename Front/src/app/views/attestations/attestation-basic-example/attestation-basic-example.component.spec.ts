import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationBasicExampleComponent } from './attestation-basic-example.component';

describe('AttestationBasicExampleComponent', () => {
  let component: AttestationBasicExampleComponent;
  let fixture: ComponentFixture<AttestationBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttestationBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
