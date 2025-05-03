import { TestBed } from '@angular/core/testing';

import { GererAttestationsService } from './gerer-attestations.service';

describe('GererAttestationsService', () => {
  let service: GererAttestationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererAttestationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
