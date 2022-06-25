import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsSpinnerComponent } from './bs-spinner.component';

describe('BsSpinnerComponent', () => {
  let component: BsSpinnerComponent;
  let fixture: ComponentFixture<BsSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
