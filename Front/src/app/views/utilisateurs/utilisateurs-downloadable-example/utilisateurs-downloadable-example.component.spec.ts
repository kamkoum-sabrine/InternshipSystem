import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursDownloadableExampleComponent } from './utilisateurs-downloadable-example.component';
import { ButtonModule, SmartTableModule } from '@coreui/angular-pro';

describe('UtilisateursDownloadableExampleComponent', () => {
  let component: UtilisateursDownloadableExampleComponent;
  let fixture: ComponentFixture<UtilisateursDownloadableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule, SmartTableModule, UtilisateursDownloadableExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursDownloadableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
