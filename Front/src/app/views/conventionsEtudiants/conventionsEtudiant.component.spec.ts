import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  AlertModule,
  BadgeModule, ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  SmartTableModule
} from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';
import { ConventionsEtudiantComponent } from './conventionsEtudiant.component';
import { ConventionsEtudiantBasicExampleComponent } from './conventionsEtudiant-basic-example/conventionsEtudiant-basic-example.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConventionsEtudiantsComponent', () => {
  let component: ConventionsEtudiantComponent;
  let fixture: ComponentFixture<ConventionsEtudiantComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, ConventionsEtudiantComponent, ConventionsEtudiantBasicExampleComponent],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ConventionsEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
