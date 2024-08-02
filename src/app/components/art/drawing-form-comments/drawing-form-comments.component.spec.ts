import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingFormCommentsComponent } from './drawing-form-comments.component';

describe('DrawingFormCommentsComponent', () => {
  let component: DrawingFormCommentsComponent;
  let fixture: ComponentFixture<DrawingFormCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingFormCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingFormCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
