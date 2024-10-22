export class SettingNotFoundError extends Error {
  constructor(settingKey: string) {
    super(`Setting with key "${settingKey}" not found.`);
    this.name = 'SettingNotFoundError';
  }
}
