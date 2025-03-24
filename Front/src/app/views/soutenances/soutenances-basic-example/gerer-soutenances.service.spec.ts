import { TestBed } from '@angular/core/testing';

import { GererSoutenancesService } from './gerer-soutenances.service';

describe('GererSoutenancesService', () => {
  let service: GererSoutenancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererSoutenancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
