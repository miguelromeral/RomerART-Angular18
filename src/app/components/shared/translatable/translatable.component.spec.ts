import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatableComponent } from './translatable.component'; // Standalone component
import { LanguageService } from '@app/services/language/language.service';
import { BehaviorSubject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MrTranslateService } from '@app/services/translate/mr-translate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TranslatableComponent (standalone)', () => {
  let component: TranslatableComponent;
  // let languageService: LanguageService;
  let mrTranslateService: MrTranslateService;
  let fixture: ComponentFixture<TranslatableComponent>;

  beforeEach(async () => {
    const spyTranslate = jasmine.createSpyObj('MrTranslateService', [
      'translate',
    ]);

    // // Creación de espía para LanguageService y simulación de currentLanguage$
    // const spyLanguage = jasmine.createSpyObj('LanguageService', [
    //   'translateText',
    // ]);
    // const currentLanguageSubject = new BehaviorSubject<string>('es');
    // spyLanguage.currentLanguage$ = currentLanguageSubject.asObservable();

    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [
        TranslatableComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ], // Importar el componente standalone
      providers: [
        // { provide: LanguageService, useValue: spyLanguage },
        { provide: MrTranslateService, useValue: spyTranslate },
      ],
    }).compileComponents();

    // // Inyectar los servicios mockeados
    // languageService = TestBed.inject(LanguageService);
    mrTranslateService = TestBed.inject(MrTranslateService);

    // Crear la instancia del componente
    fixture = TestBed.createComponent(TranslatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should read current language', () => {
  //   expect(languageService.currentLanguage$).toBeDefined();
  // });
});
