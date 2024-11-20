import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCommentWrapperComponent } from '@app/components/drawings/details/comment-wrapper/comment-wrapper.component';

describe('DrawingCommentWrapperComponent', () => {
  let component: DrawingCommentWrapperComponent;
  let fixture: ComponentFixture<DrawingCommentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingCommentWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingCommentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
