import { TestBed } from '@angular/core/testing';

import { GererConventionsServiceService } from './gerer-conventions-service.service';

describe('GererConventionsServiceService', () => {
  let service: GererConventionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererConventionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
