import { TestBed } from '@angular/core/testing';

import { ConventionNonAnnuleeService } from './convention-non-annulee.service';

describe('ConventionNonAnnuleeService', () => {
  let service: ConventionNonAnnuleeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionNonAnnuleeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
