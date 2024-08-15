export interface IDetectedLanguage {
  language: string;
  score: number;
}

export interface ITranslation {
  text: string;
  to: string;
}

export interface ITranslateResponse {
  detectedLanguage: IDetectedLanguage;
  translations: ITranslation[];
}
