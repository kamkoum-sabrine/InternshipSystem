import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantBasicExampleComponent } from './enseignant-basic-example.component';

describe('EnseignantBasicExampleComponent', () => {
  let component: EnseignantBasicExampleComponent;
  let fixture: ComponentFixture<EnseignantBasicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantBasicExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantBasicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
