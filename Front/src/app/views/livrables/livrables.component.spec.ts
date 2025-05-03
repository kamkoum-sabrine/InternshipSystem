import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrablesComponent } from './livrables.component';

describe('LivrablesComponent', () => {
  let component: LivrablesComponent;
  let fixture: ComponentFixture<LivrablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
