import { TestBed } from '@angular/core/testing';

import { NonAnnuleesService } from './non-annulees.service';

describe('NonAnnuleesService', () => {
  let service: NonAnnuleesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonAnnuleesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
