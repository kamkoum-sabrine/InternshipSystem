import { TestBed } from '@angular/core/testing';

import { GererUtilisateurService } from './gerer-utilisateur.service';

describe('GererUtilisateurService', () => {
  let service: GererUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
