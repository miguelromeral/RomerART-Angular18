import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { BehaviorSubject } from 'rxjs';

export interface ISetting<T> {
  key: string;
  defaultValue: T;
}

export interface ISettingSelect extends ISetting<string> {
  options: ICustomSelectOption[];
}

export class Setting<T> {
  key: string;
  defaultValue: T;
  subject: BehaviorSubject<T>;

  constructor(setting: ISetting<T>) {
    this.key = setting.key;
    this.defaultValue = setting.defaultValue;
    this.subject = new BehaviorSubject<T>(this.defaultValue);
  }
}

export class SettingSelect extends Setting<string> {
  options: ICustomSelectOption[];

  constructor(setting: ISettingSelect) {
    super(setting);
    this.options = setting.options;
  }
}
