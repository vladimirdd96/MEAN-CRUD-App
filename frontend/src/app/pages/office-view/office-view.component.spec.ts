import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeViewComponent } from './office-view.component';

describe('OfficeViewComponent', () => {
  let component: OfficeViewComponent;
  let fixture: ComponentFixture<OfficeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
