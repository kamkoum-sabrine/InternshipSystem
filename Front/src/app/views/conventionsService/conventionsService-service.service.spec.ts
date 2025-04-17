import { TestBed } from '@angular/core/testing';

import { ConventionsServiceService } from './conventionsService-service.service';

describe('ConventionsServiceServiceService', () => {
  let service: ConventionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
