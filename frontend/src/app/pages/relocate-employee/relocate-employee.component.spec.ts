import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelocateEmployeeComponent } from './relocate-employee.component';

describe('RelocateEmployeeComponent', () => {
  let component: RelocateEmployeeComponent;
  let fixture: ComponentFixture<RelocateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelocateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelocateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
