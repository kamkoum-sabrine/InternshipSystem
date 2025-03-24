import { TestBed } from '@angular/core/testing';

import { GererEntreprisesService } from './gerer-entreprises.service';

describe('GererEntreprisesService', () => {
  let service: GererEntreprisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererEntreprisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
