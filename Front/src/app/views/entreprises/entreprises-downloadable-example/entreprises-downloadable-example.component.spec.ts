import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisesDownloadableExampleComponent } from './entreprises-downloadable-example.component';
import { ButtonModule, SmartTableModule } from '@coreui/angular-pro';

describe('EntreprisesDownloadableExampleComponent', () => {
  let component: EntreprisesDownloadableExampleComponent;
  let fixture: ComponentFixture<EntreprisesDownloadableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule, SmartTableModule, EntreprisesDownloadableExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisesDownloadableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
