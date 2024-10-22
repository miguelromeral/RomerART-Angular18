import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  ISettingNumber,
  ISettingSelect,
  ISettingSwitch,
} from '@models/settings/settings.model';
import { SettingNotFoundError } from '@app/errors/settings/setting-not-found.error';
import {
  settingDefaultFilterSortBy,
  settingFilterCount,
  settingMaxZoom,
} from 'config/settings/local-storage.config';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TranslateModule.forRoot()] });
    service = TestBed.inject(SettingsService);

    service.setNumberSetting(settingMaxZoom.key, settingMaxZoom.defaultValue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return custom error if settings not found', () => {
    const inventedSetting = {
      key: 'invented',
    };

    expect(() =>
      service.booleanSettingValue(inventedSetting as ISettingSwitch)
    ).toThrowError(SettingNotFoundError);

    expect(() =>
      service.selectSettingValue(inventedSetting as ISettingSelect)
    ).toThrowError(SettingNotFoundError);

    expect(() =>
      service.numberSettingValue(inventedSetting as ISettingNumber)
    ).toThrowError(SettingNotFoundError);
  });

  it('should return a setting value of each type', () => {
    expect(service.booleanSettingValue(settingFilterCount)).toBe(
      settingFilterCount.defaultValue
    );
    expect(service.selectSettingValue(settingDefaultFilterSortBy)).toBe(
      settingDefaultFilterSortBy.defaultValue
    );
    expect(service.numberSettingValue(settingMaxZoom)).toBe(
      settingMaxZoom.defaultValue
    );
  });

  // it('should set up form controls', () => {
  //   const expectedFormGroup: FormGroup = new FormGroup({});
  //   const resultFormGroup: FormGroup = new FormGroup({});

  //   service.getSettings().forEach(section => {
  //     section.settings.forEach(set => {
  //       expectedFormGroup.addControl(
  //         set.formControlName,
  //         new FormControl(set.defaultValue)
  //       );
  //     });
  //   });

  //   service.setFormControls(resultFormGroup);

  //   console.log('EX: ', expectedFormGroup.controls);
  //   console.log('Re: ', resultFormGroup.controls);

  //   expect(expectedFormGroup.controls).toBe(resultFormGroup.controls);
  // });

  it('should initialize number setting appropiately', () => {
    service.setNumberSetting(settingMaxZoom.key, settingMaxZoom.minValue! - 1);

    expect(service.numberSettingValue(settingMaxZoom)).toBe(
      settingMaxZoom.minValue!
    );
    service.setNumberSetting(settingMaxZoom.key, settingMaxZoom.maxValue! + 1);

    expect(service.numberSettingValue(settingMaxZoom)).toBe(
      settingMaxZoom.maxValue!
    );
  });
});
