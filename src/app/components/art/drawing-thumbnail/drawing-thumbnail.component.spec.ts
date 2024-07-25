import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingThumbnailComponent } from './drawing-thumbnail.component';

describe('DrawingThumbnailComponent', () => {
  let component: DrawingThumbnailComponent;
  let fixture: ComponentFixture<DrawingThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingThumbnailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
