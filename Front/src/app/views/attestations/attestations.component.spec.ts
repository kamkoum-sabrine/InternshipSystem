import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationsComponent } from './attestations.component';

describe('AttestationsComponent', () => {
  let component: AttestationsComponent;
  let fixture: ComponentFixture<AttestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
