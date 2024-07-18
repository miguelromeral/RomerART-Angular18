import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentWrapperComponent } from './comment-wrapper.component';

describe('CommentWrapperComponent', () => {
  let component: CommentWrapperComponent;
  let fixture: ComponentFixture<CommentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
