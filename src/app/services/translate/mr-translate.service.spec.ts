import { TestBed } from '@angular/core/testing';

import { MrTranslateService } from './mr-translate.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { ITranslateResponse } from '@models/responses/translate-response.model';

describe('MrTranslateService', () => {
  let service: MrTranslateService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    environment.translation = {
      apiKey: 'mockedApiKey',
      region: 'westeurope',
      url: 'https://www.mockedurl.com/api/',
    };

    const spyHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: spyHttp }],
    });
    service = TestBed.inject(MrTranslateService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the translate API', done => {
    const originalText = 'Original Text';
    const translatedText = 'Texto Original';
    const originalLanguage = 'en';
    const expectedLanguage = 'es';
    const mockedResponse: ITranslateResponse[] = [
      {
        detectedLanguage: {
          language: originalLanguage,
          score: 1,
        },
        translations: [
          {
            text: translatedText,
            to: expectedLanguage,
          },
        ],
      },
    ];
    httpClientSpy.post.and.returnValue(of(mockedResponse));

    service.translate(originalText, expectedLanguage).subscribe(result => {
      expect(result).toBeDefined();
      expect(result[0].detectedLanguage.language)
        .withContext('detected language equals original language')
        .toBe(originalLanguage);
      expect(result[0].translations[0].text)
        .withContext('translated text should be as expected')
        .toBe(translatedText);
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['endpoint']}/translate?api-version=3.0&to=${expectedLanguage}`,
      JSON.stringify([{ Text: originalText }]),
      { headers: service.httpHeaders }
    );
  });
});
