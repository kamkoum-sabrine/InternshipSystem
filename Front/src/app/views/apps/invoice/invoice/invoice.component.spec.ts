import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, CardModule, GridModule, TableModule } from '@coreui/angular-pro';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../../icons/icon-subset';
import { InvoiceComponent } from './invoice.component';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, GridModule, ButtonModule, TableModule, IconModule, InvoiceComponent],
      providers: [IconSetService]
    }).compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
