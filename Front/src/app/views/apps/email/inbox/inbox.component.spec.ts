import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BadgeModule, ButtonGroupModule, CardModule, DropdownModule } from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';

import { InboxMessageComponent } from '../inbox-message/inbox-message.component';
import { MailToolbarComponent } from '../mail-toolbar/mail-toolbar.component';
import { InboxComponent } from './inbox.component';
import { iconSubset } from '../../../../icons/icon-subset';

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardModule, ButtonGroupModule, DropdownModule, BadgeModule, ReactiveFormsModule, InboxComponent, InboxMessageComponent, MailToolbarComponent],
      providers: [IconSetService, provideRouter([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
