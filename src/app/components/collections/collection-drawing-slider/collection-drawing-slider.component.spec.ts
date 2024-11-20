import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDrawingSliderComponent } from './collection-drawing-slider.component';

describe('CollectionDrawingSliderComponent', () => {
  let component: CollectionDrawingSliderComponent;
  let fixture: ComponentFixture<CollectionDrawingSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionDrawingSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionDrawingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
