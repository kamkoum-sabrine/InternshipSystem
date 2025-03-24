import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MessageComponent } from './message.component';
import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule } from '@coreui/angular-pro';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MailToolbarComponent } from '../mail-toolbar/mail-toolbar.component';
import { iconSubset } from '../../../../icons/icon-subset';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardModule, IconModule, BadgeModule, ButtonModule, ButtonGroupModule, DropdownModule, MessageComponent, MailToolbarComponent],
      providers: [IconSetService, provideRouter([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
