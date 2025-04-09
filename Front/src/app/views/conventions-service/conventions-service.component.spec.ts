import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsServiceComponent } from './conventions-service.component';

describe('ConventionsServiceComponent', () => {
  let component: ConventionsServiceComponent;
  let fixture: ComponentFixture<ConventionsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionsServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
