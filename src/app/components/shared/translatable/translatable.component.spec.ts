import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatableComponent } from './translatable.component'; // Standalone component
import { LanguageService } from '@app/services/language/language.service';
import { BehaviorSubject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('TranslatableComponent (standalone)', () => {
  let component: TranslatableComponent;
  // let languageService: LanguageService;
  // let translateService: MrTranslateService;
  let fixture: ComponentFixture<TranslatableComponent>;

  beforeEach(async () => {
    // // Creación de espía para MrTranslateService con solo el método "translate"
    // const spyTranslate = jasmine.createSpyObj('MrTranslateService', [
    //   'translate',
    // ]);

    // // Creación de espía para LanguageService y simulación de currentLanguage$
    // const spyLanguage = jasmine.createSpyObj('LanguageService', [
    //   'translateText',
    // ]);
    // const currentLanguageSubject = new BehaviorSubject<string>('es');
    // spyLanguage.currentLanguage$ = currentLanguageSubject.asObservable();

    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [TranslatableComponent, TranslateModule.forRoot()], // Importar el componente standalone
      // providers: [
      //   { provide: LanguageService, useValue: spyLanguage },
      //   { provide: MrTranslateService, useValue: spyTranslate },
      // ],
    }).compileComponents();

    // // Inyectar los servicios mockeados
    // languageService = TestBed.inject(LanguageService);
    // translateService = TestBed.inject(MrTranslateService);

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
