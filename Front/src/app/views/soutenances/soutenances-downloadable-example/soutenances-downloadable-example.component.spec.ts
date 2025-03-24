import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenancesDownloadableExampleComponent } from './soutenances-downloadable-example.component';
import { ButtonModule, SmartTableModule } from '@coreui/angular-pro';

describe('SoutenancesDownloadableExampleComponent', () => {
  let component: SoutenancesDownloadableExampleComponent;
  let fixture: ComponentFixture<SoutenancesDownloadableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule, SmartTableModule, SoutenancesDownloadableExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenancesDownloadableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
