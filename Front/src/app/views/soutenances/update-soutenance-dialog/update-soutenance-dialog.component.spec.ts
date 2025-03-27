import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSoutenanceDialogComponent } from './update-soutenance-dialog.component';

describe('UpdateSoutenanceDialogComponent', () => {
  let component: UpdateSoutenanceDialogComponent;
  let fixture: ComponentFixture<UpdateSoutenanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSoutenanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSoutenanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
