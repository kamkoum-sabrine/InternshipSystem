import { TestBed } from '@angular/core/testing';

import { ConventionComiteService } from './convention-comite.service';

describe('ConventionComiteService', () => {
  let service: ConventionComiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionComiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
