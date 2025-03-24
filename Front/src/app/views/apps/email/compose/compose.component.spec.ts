import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule } from '@coreui/angular-pro';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../../icons/icon-subset';
import { ComposeComponent } from './compose.component';

describe('ComposeComponent', () => {
  let component: ComposeComponent;
  let fixture: ComponentFixture<ComposeComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GridModule, CardModule, FormModule, ButtonModule, IconModule, ButtonGroupModule, BadgeModule, DropdownModule, ComposeComponent],
      providers: [IconSetService, provideRouter([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
