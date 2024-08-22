import { Setting } from './settings.model';

export class SettingSection {
  titleCode: string;
  icon: string;
  settings: Setting[];

  constructor(data: Partial<SettingSection> = {}) {
    this.titleCode = data.titleCode || '';
    this.icon = data.icon || '';
    this.settings = data.settings || [];
  }
}
