import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSliderComponent } from './drawing-slider.component';

describe('DrawingSliderComponent', () => {
  let component: DrawingSliderComponent;
  let fixture: ComponentFixture<DrawingSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
