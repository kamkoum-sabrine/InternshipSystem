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
import { SmartTablesComponent } from './smart-tables.component';
import { SmartTablesBasicExampleComponent } from './smart-tables-basic-example/smart-tables-basic-example.component';
import {
  SmartTablesSelectableExampleComponent
} from './smart-tables-selectable-example/smart-tables-selectable-example.component';
import {
  SmartTablesDownloadableExampleComponent
} from './smart-tables-downloadable-example/smart-tables-downloadable-example.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SmartTablesComponent', () => {
  let component: SmartTablesComponent;
  let fixture: ComponentFixture<SmartTablesComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardModule, GridModule, RouterTestingModule, SmartTableModule, AlertModule, NoopAnimationsModule, BadgeModule, ButtonModule, DropdownModule, SmartTablesComponent, SmartTablesBasicExampleComponent, SmartTablesSelectableExampleComponent, SmartTablesDownloadableExampleComponent],
    providers: [IconSetService]
})
    .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(SmartTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
