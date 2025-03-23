import { TestBed } from '@angular/core/testing';

import { UtilisateursServiceService } from './utilisateurs-service.service';

describe('UtilisateursServiceService', () => {
  let service: UtilisateursServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateursServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
