import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../../icons/icon-subset';
import { InboxMessageComponent } from './inbox-message.component';

describe('InboxMessageComponent', () => {
  let component: InboxMessageComponent;
  let fixture: ComponentFixture<InboxMessageComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IconModule, InboxMessageComponent],
      providers: [IconSetService]
    }).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(InboxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
