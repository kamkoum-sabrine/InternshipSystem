import { TestBed } from '@angular/core/testing';

import { GererConventionsService } from './gerer-conventions.service';

describe('GererConventionsService', () => {
  let service: GererConventionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererConventionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
