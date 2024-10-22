import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';
import { By } from '@angular/platform-browser';
import { LanguageService } from '@app/services/language/language.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MrTranslateService } from '@app/services/translate/mr-translate.service';
import { BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let languageService: LanguageService;
  let mrTranslateService: MrTranslateService;

  beforeEach(async () => {
    const spyTranslate = jasmine.createSpyObj('MrTranslateService', [
      'translate',
    ]);

    // Creación de espía para LanguageService y simulación de currentLanguage$
    const spyLanguage = jasmine.createSpyObj('LanguageService', [
      'translateText',
    ]);
    const currentLanguageSubject = new BehaviorSubject<string>('es');
    spyLanguage.currentLanguage$ = currentLanguageSubject.asObservable();

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA], // Ignora los componentes desconocidos
      imports: [
        CommentComponent,
        BrowserAnimationsModule,
        TranslatableComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: LanguageService, useValue: spyLanguage },
        { provide: MrTranslateService, useValue: spyTranslate },
      ],
    }).compileComponents();

    languageService = TestBed.inject(LanguageService);
    mrTranslateService = TestBed.inject(MrTranslateService);
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
