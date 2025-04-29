import { TestBed } from '@angular/core/testing';

import { ConventionsComiteChefServiceService } from './conventions-comite-chef-service.service';

describe('ConventionsComiteChefServiceService', () => {
  let service: ConventionsComiteChefServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionsComiteChefServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
