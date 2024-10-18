import { TestBed } from '@angular/core/testing';

import { MrTranslateService } from './mr-translate.service';
import { HttpClient } from '@angular/common/http';

describe('MrTranslateService', () => {
  let service: MrTranslateService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
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
});
