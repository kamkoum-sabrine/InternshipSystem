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
import { ConventionsDirectionEnicarComponent } from './conventionsDirectionEnicar.component';
import { ConventionsDirectionEnicarBasicExampleComponent } from './conventionsDirectionEnicar-basic-example/conventionsDirectionEnicar-basic-example.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConventionsDirectionEnicarComponent', () => {
  let component: ConventionsDirectionEnicarComponent;
  let fixture: ComponentFixture<ConventionsDirectionEnicarComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, ConventionsDirectionEnicarComponent, ConventionsDirectionEnicarBasicExampleComponent],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ConventionsDirectionEnicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
