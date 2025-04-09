import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsServiceBasicExampleComponent } from './conventions-service-basic-example.component';

describe('ConventionsServiceBasicExampleComponent', () => {
  let component: ConventionsServiceBasicExampleComponent;
  let fixture: ComponentFixture<ConventionsServiceBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionsServiceBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionsServiceBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
