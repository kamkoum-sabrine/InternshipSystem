import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsComiteChefComponent } from './conventions-comite-chef.component';

describe('ConventionsComiteChefComponent', () => {
  let component: ConventionsComiteChefComponent;
  let fixture: ComponentFixture<ConventionsComiteChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionsComiteChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionsComiteChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
