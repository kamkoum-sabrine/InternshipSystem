import { TestBed } from '@angular/core/testing';

import { GoogleMapsResizeObserverService } from './google-maps-resize-observer.service';

describe('GoogleMapsResizeObserverService', () => {
  let service: GoogleMapsResizeObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapsResizeObserverService]
    });
    service = TestBed.inject(GoogleMapsResizeObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
