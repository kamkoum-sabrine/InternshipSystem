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
import { EntreprisesComponent } from './entreprises.component';
import { EntreprisesBasicExampleComponent } from './entreprises-basic-example/entreprises-basic-example.component';
import {
  EntreprisesSelectableExampleComponent
} from './entreprises-selectable-example/entreprises-selectable-example.component';
import {
  EntreprisesDownloadableExampleComponent
} from './entreprises-downloadable-example/entreprises-downloadable-example.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EntreprisesComponent', () => {
  let component: EntreprisesComponent;
  let fixture: ComponentFixture<EntreprisesComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, EntreprisesComponent, EntreprisesBasicExampleComponent, EntreprisesSelectableExampleComponent, EntreprisesDownloadableExampleComponent],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(EntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
