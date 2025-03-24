import { TestBed } from '@angular/core/testing';

import { EntreprisesServiceService } from './entreprises-service.service';

describe('EntreprisesServiceService', () => {
  let service: EntreprisesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreprisesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
