import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoogleMapsModule } from '@angular/google-maps';
import { CardModule } from '@coreui/angular-pro';
import { GoogleMapsComponent } from './google-maps.component';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [CardModule, GoogleMapsModule, GoogleMapsComponent],
    providers: [GoogleMapsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
