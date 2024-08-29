import { FormControl } from '@angular/forms';
import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { BehaviorSubject, Observable } from 'rxjs';

export type SettingType = 'switch' | 'select';

export interface ISettingBase<T> {
  key: string;
  icon?: string;
  titleCode: string;
  descriptionCode: string;
  type: SettingType;
  defaultValue: T;
  formControlName: string;
}

export interface ISettingSwitch extends ISettingBase<boolean> {
  inputId: string;
  showCode: string;
  hideCode: string;
}

export interface ISettingSelect extends ISettingBase<string> {
  options: ICustomSelectOption[];
}

export type ISetting = ISettingSwitch | ISettingSelect;

export class SettingBase<T> implements ISettingBase<T> {
  key: string;
  defaultValue: T;
  icon: string;
  titleCode: string;
  descriptionCode: string;
  type: SettingType;
  subject: BehaviorSubject<T>;
  subject$: Observable<T | null>;
  formControlName: string;
  formControl: FormControl | undefined;

  constructor(setting: ISettingBase<T>) {
    this.key = setting.key;
    this.type = setting.type;
    this.icon = setting.icon ?? '';
    this.defaultValue = setting.defaultValue;
    this.titleCode = setting.titleCode;
    this.descriptionCode = setting.descriptionCode;
    this.formControlName = setting.formControlName;
    this.subject = new BehaviorSubject<T>(this.defaultValue);
    this.subject$ = this.subject.asObservable();
  }

  setFormControl(formControl: FormControl) {
    this.formControl = formControl;
  }
}

export class SettingSwitch extends SettingBase<boolean> {
  inputId: string;
  showCode: string;
  hideCode: string;

  constructor(setting: ISettingSwitch) {
    super(setting);
    this.inputId = setting.inputId;
    this.showCode = setting.showCode;
    this.hideCode = setting.hideCode;
  }
}

export class SettingSelect extends SettingBase<string> {
  options: ICustomSelectOption[];

  constructor(setting: ISettingSelect) {
    super(setting);
    this.options = setting.options;
  }
}

export type Setting = SettingSwitch | SettingSelect;
