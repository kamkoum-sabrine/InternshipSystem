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
import { UtilisateursComponent } from './utilisateurs.component';
import { UtilisateursBasicExampleComponent } from './utilisateurs-basic-example/utilisateurs-basic-example.component';
import {
  UtilisateursSelectableExampleComponent
} from './utilisateurs-selectable-example/utilisateurs-selectable-example.component';
import {
  UtilisateursDownloadableExampleComponent
} from './utilisateurs-downloadable-example/utilisateurs-downloadable-example.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UtilisateursComponent', () => {
  let component: UtilisateursComponent;
  let fixture: ComponentFixture<UtilisateursComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, UtilisateursComponent, UtilisateursBasicExampleComponent, UtilisateursSelectableExampleComponent, UtilisateursDownloadableExampleComponent],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(UtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
