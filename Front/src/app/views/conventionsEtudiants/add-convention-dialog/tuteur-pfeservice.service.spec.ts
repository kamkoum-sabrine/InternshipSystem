import { TestBed } from '@angular/core/testing';

import { TuteurPFEServiceService } from './tuteur-pfeservice.service';

describe('TuteurPFEServiceService', () => {
  let service: TuteurPFEServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuteurPFEServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
