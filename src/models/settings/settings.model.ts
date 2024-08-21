import { BehaviorSubject } from 'rxjs';

export interface ISettingOption<T> {
  key: string;
  defaultValue: T;
}

export class Setting<T> {
  key: string;
  defaultValue: T;
  subject: BehaviorSubject<T>;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
    this.subject = new BehaviorSubject<T>(defaultValue);
  }

  static getSettingFromInterface<T>(option: ISettingOption<T>): Setting<T> {
    return new Setting<T>(option.key, option.defaultValue);
  }
}
