import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsServiceStageComponent } from './conventions-service-stage.component';

describe('ConventionsServiceStageComponent', () => {
  let component: ConventionsServiceStageComponent;
  let fixture: ComponentFixture<ConventionsServiceStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionsServiceStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionsServiceStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
