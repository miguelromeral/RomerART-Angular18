import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslatePipe } from './customtranslate';
import { of } from 'rxjs';

describe('CustomTranslatePipe', () => {
  let pipe: CustomTranslatePipe;
  let translateServiceMock: any;
  let cdrMock: any;

  beforeEach(() => {
    // Mock del TranslateService
    translateServiceMock = jasmine.createSpyObj('TranslateService', [
      'get',
      'onLangChange',
    ]);

    // Devuelve el mismo key como traducción en el mock
    translateServiceMock.get.and.callFake((key: string) => of(key));
    // Simula un cambio de idioma observable
    translateServiceMock.onLangChange = of({ lang: 'es' });

    // Mock de ChangeDetectorRef (Change Detection)
    cdrMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);

    // Proporcionamos el servicio y CDR como dependencias
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: ChangeDetectorRef, useValue: cdrMock },
      ],
    });

    // Creamos una instancia de la pipe
    pipe = new CustomTranslatePipe(translateServiceMock, cdrMock);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if query is empty', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });
});
