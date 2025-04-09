import { TestBed } from '@angular/core/testing';

import { ConventionsServiceService } from './conventions-service.service';

describe('ConventionsServiceService', () => {
  let service: ConventionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
