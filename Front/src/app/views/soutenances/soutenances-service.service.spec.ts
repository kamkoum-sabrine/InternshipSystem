import { TestBed } from '@angular/core/testing';

import { SoutenancesServiceService } from './soutenances-service.service';

describe('SoutenancesServiceService', () => {
  let service: SoutenancesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoutenancesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
