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
import { SoutenancesComponent } from './soutenances.component';
import { SoutenancesBasicExampleComponent } from './soutenances-basic-example/soutenances-basic-example.component';
import {
  SoutenancesSelectableExampleComponent
} from './soutenances-selectable-example/soutenances-selectable-example.component';
import {
  SoutenancesDownloadableExampleComponent
} from './soutenances-downloadable-example/soutenances-downloadable-example.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SoutenancesComponent', () => {
  let component: SoutenancesComponent;
  let fixture: ComponentFixture<SoutenancesComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, SoutenancesComponent, SoutenancesBasicExampleComponent, SoutenancesSelectableExampleComponent, SoutenancesDownloadableExampleComponent],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(SoutenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
