import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: jasmine.SpyObj<TranslateService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const translateSpy = jasmine.createSpyObj('TranslateService', [
      'addLangs',
      'use',
      'get',
    ]);
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Cambiado para verificar que el servicio se ha creado correctamente
  });
});
