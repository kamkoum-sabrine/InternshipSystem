import { TestBed } from '@angular/core/testing';

import { AttestationsService } from './attestations.service';

describe('AttestationsService', () => {
  let service: AttestationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttestationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
