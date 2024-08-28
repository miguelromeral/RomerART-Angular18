import { of } from 'rxjs';

export const mockTranslateService = {
  get: () => of('translated text'),
};
