import { TestBed } from '@angular/core/testing';

import { ConventionsEtudiantService } from './conventionsEtudiant-service.service';

describe('ConventionsEtudiantServiceService', () => {
  let service: ConventionsEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConventionsEtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
