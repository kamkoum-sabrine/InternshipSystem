import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsComiteChefBasicExampleComponent } from './conventions-comite-chef-basic-example.component';

describe('ConventionsComiteChefBasicExampleComponent', () => {
  let component: ConventionsComiteChefBasicExampleComponent;
  let fixture: ComponentFixture<ConventionsComiteChefBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConventionsComiteChefBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionsComiteChefBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
