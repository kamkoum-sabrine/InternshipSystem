import { TestBed } from '@angular/core/testing';

import { ConventionsDirectionEnicarService } from './conventionsDirectionEnicar-service.service';

describe('ConventionsDirectionEnicarServiceService', () => {
  let service: ConventionsDirectionEnicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionsDirectionEnicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
