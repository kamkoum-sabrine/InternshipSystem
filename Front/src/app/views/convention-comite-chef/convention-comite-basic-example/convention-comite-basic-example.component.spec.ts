import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionComiteBasicExampleComponent } from './convention-comite-basic-example.component';

describe('ConventionComiteBasicExampleComponent', () => {
  let component: ConventionComiteBasicExampleComponent;
  let fixture: ComponentFixture<ConventionComiteBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionComiteBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionComiteBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
