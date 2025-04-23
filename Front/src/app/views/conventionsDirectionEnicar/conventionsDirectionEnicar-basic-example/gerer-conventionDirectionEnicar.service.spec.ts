import { TestBed } from '@angular/core/testing';

import { GererConventionsDirectionEnicarService } from './gerer-conventionsDirectionEnicar.service'

describe('GererDirectionEnicarService', () => {
  let service: GererConventionsDirectionEnicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererConventionsDirectionEnicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
