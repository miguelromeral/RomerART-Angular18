import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvComponent } from './cv.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@app/services/language/language.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { of } from 'rxjs';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async () => {
    const mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'get',
      'setDefaultLang',
      'use',
      'onLangChange',
      'onTranslationChange',
      'onDefaultLangChange',
    ]);

    // Simulamos los observables que suscriben a los cambios de idioma
    mockTranslateService.onLangChange.and.returnValue(of({ lang: 'es' }));
    mockTranslateService.onTranslationChange.and.returnValue(of({}));
    mockTranslateService.onDefaultLangChange.and.returnValue(of({}));

    const mockLanguageService = jasmine.createSpyObj('LanguageService', [
      'currentLanguage$',
    ]);
    // Simulamos el comportamiento de currentLanguage$
    mockLanguageService.currentLanguage$ = of('es');

    const mockSettingsService = jasmine.createSpyObj('SettingsService', [
      'selectSetting$',
    ]);
    // Simulamos el comportamiento de selectSetting$
    mockSettingsService.selectSetting$.and.returnValue(of('YYYY-MM-DD'));

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CustomTranslatePipe], // Asegúrate de que TranslateModule esté importado
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: SettingsService, useValue: mockSettingsService },
        { provide: TranslateService, useValue: mockTranslateService }, // Provee el TranslateService simulado
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
