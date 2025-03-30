import { TestBed } from '@angular/core/testing';

import { EnseignantService } from './enseignant-service.service';

describe('SoutenancesServiceService', () => {
  let service: EnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
