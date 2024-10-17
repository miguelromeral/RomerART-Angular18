import { of } from 'rxjs';

export const mockMrTranslateService = {
  get: () => of('translated text'),
};
