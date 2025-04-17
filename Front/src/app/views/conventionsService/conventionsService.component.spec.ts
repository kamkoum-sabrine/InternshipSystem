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
import { ConventionsServiceComponent } from './conventionsService.component';
import { ConventionsServiceBasicExampleComponent } from './conventionsService-basic-example/conventionsService-basic-example.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConventionsServicesComponent', () => {
  let component: ConventionsServiceComponent;
  let fixture: ComponentFixture<ConventionsServiceComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, ConventionsServiceComponent, ConventionsServiceBasicExampleComponent],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ConventionsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
