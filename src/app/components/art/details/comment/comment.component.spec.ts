import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@app/services/translate/translate.service';
import { LanguageService } from '@app/services/language/language.service';
import { mockTranslateService } from '../../../../../../e2e/mocks/services/translate.service.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockLanguageService } from '../../../../../../e2e/mocks/services/language.service.mock';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA], // Ignora los componentes desconocidos
      imports: [CommentComponent, TranslatableComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: LanguageService, useValue: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "like" class when type is "like"', () => {
    component.type = 'like';
    fixture.detectChanges();

    const commentElement = fixture.debugElement.query(By.css('.comment'));
    expect(commentElement.classes['like']).toBeTrue();
    expect(commentElement.classes['dislike']).toBeFalsy();
  });

  it('should apply "dislike" class when type is "dislike"', () => {
    component.type = 'dislike';
    fixture.detectChanges();

    const commentElement = fixture.debugElement.query(By.css('.comment'));
    expect(commentElement.classes['dislike']).toBeTrue();
    expect(commentElement.classes['like']).toBeFalsy();
  });

  it('should not apply "like" or "dislike" class when type is empty', () => {
    component.type = '';
    fixture.detectChanges();

    const commentElement = fixture.debugElement.query(By.css('.comment'));
    expect(commentElement.classes['like']).toBeFalsy();
    expect(commentElement.classes['dislike']).toBeFalsy();
  });

  it('should pass the comment input to TranslatableComponent', () => {
    const commentText = 'This is a test comment';
    component.comment = commentText;
    fixture.detectChanges();

    const translatableElement = fixture.debugElement.query(
      By.directive(TranslatableComponent)
    );
    const translatableComponentInstance =
      translatableElement.componentInstance as TranslatableComponent;

    expect(translatableComponentInstance.originalText).toBe(commentText);
  });

  it('should pass an empty string to TranslatableComponent if comment input is null', () => {
    component.comment = null;
    fixture.detectChanges();

    const translatableElement = fixture.debugElement.query(
      By.directive(TranslatableComponent)
    );
    const translatableComponentInstance =
      translatableElement.componentInstance as TranslatableComponent;

    expect(translatableComponentInstance.originalText).toBe('');
  });
});
