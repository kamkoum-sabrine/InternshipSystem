import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableBasicExampleComponent } from './livrable-basic-example.component';

describe('LivrableBasicExampleComponent', () => {
  let component: LivrableBasicExampleComponent;
  let fixture: ComponentFixture<LivrableBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrableBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrableBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
