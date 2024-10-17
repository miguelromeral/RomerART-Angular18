import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingFormCommentsComponent } from './drawing-form-comments.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DrawingFormCommentsComponent', () => {
  let component: DrawingFormCommentsComponent;
  let fixture: ComponentFixture<DrawingFormCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingFormCommentsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawingFormCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
