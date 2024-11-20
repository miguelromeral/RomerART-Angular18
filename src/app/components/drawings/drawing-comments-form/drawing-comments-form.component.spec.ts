import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCommentsFormComponent } from '@app/components/drawings/drawing-form-comments/drawing-form-comments.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DrawingCommentsFormComponent', () => {
  let component: DrawingCommentsFormComponent;
  let fixture: ComponentFixture<DrawingCommentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingCommentsFormComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawingCommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
