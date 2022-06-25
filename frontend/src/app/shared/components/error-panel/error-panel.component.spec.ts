import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPanelComponent } from './error-panel.component';

describe('ErrorPanelComponent', () => {
  let component: ErrorPanelComponent;
  let fixture: ComponentFixture<ErrorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
