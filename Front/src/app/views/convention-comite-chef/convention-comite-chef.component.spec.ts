import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionComiteChefComponent } from './convention-comite-chef.component';

describe('ConventionComiteChefComponent', () => {
  let component: ConventionComiteChefComponent;
  let fixture: ComponentFixture<ConventionComiteChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionComiteChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionComiteChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
