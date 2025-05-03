import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconventiondialogComponent } from './addconventiondialog.component';

describe('AddconventiondialogComponent', () => {
  let component: AddconventiondialogComponent;
  let fixture: ComponentFixture<AddconventiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddconventiondialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddconventiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
