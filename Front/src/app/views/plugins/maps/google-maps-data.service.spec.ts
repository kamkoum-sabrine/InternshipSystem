import { TestBed } from '@angular/core/testing';

import { GoogleMapsDataService } from './google-maps-data.service';

describe('GoogleMapsDataService', () => {
  let service: GoogleMapsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapsDataService],
    });
    service = TestBed.inject(GoogleMapsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
