import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableAddDialogComponent } from './livrable-add-dialog.component';

describe('LivrableAddDialogComponent', () => {
  let component: LivrableAddDialogComponent;
  let fixture: ComponentFixture<LivrableAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrableAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrableAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
