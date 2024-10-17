import { TestBed } from '@angular/core/testing';

import { MrTranslateService } from './mr-translate.service';

describe('TranslateService', () => {
  let service: MrTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
