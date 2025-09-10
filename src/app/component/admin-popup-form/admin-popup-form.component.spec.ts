import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPopupFormComponent } from './admin-popup-form.component';

describe('AdminPopupFormComponent', () => {
  let component: AdminPopupFormComponent;
  let fixture: ComponentFixture<AdminPopupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPopupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
