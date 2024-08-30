import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from '@app/services/language/language.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from '../../components/shared/layout/layout.component';
import { ThemeService } from '@app/services/theme/theme.service';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { RouterLink } from '@angular/router';
import { loginPath } from 'config/auth/auth.config';
import { SettingOptionComponent } from '@app/components/settings/setting-option/setting-option.component';
import { SelectInputComponent } from '@app/components/shared/inputs/select-input/select-input.component';
import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SectionComponent } from '@app/components/shared/section/section.component';
import { providersConfigList } from 'config/data/providers.config';
import { SwitchComponent } from '@app/components/shared/inputs/switch/switch.component';
import { SettingsService } from '@app/services/settings/settings.service';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';
import { environment } from 'environments/environment';
import { settingLanguage } from 'config/settings/language.config';
import { settingTheme } from 'config/settings/theme.config';
import {
  Setting,
  SettingNumber,
  SettingSelect,
  SettingSwitch,
} from '@models/settings/settings.model';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    TranslateModule,
    CustomTranslatePipe,
    NgFor,
    SettingOptionComponent,
    LayoutComponent,
    LayoutComponent,
    CustomTranslatePipe,
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    SelectInputComponent,
    SectionComponent,
    TranslatableComponent,
    SwitchComponent,
    CommonModule,
    TextInputComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
// implements OnInit, OnDestroy
export class SettingsComponent
  extends LanguageComponent
  implements OnInit, AfterViewInit
{
  loginPath = loginPath;

  version = environment.appVersion;
  languages: ICustomSelectOption[] = settingLanguage.options;
  themes: ICustomSelectOption[] = settingTheme.options;
  collapsable = environment.settings.autoCollapsed;

  providers = providersConfigList;

  settingsForm = new FormGroup({});

  constructor(
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private themeService: ThemeService,
    private settingsService: SettingsService
  ) {
    super('SCREENS.SETTINGS');

    this.settingsService.getSettings().forEach(section => {
      section.settings.forEach(set => {
        this.settingsForm.addControl(
          set.formControlName,
          new FormControl(set.defaultValue)
        );
      });
    });
  }

  get settings() {
    return this.settingsService.getSettings();
  }

  ngOnInit() {
    this.languageService.translateText(this.text('TITLE')).subscribe(text => {
      this.metadataService.updateTitle(text);
    });
  }

  ngAfterViewInit() {
    this.initSettings();
  }

  findControlByName(name: string) {
    if (this.settingsForm.contains(name)) {
      return this.settingsForm.get(name) as FormControl;
    }
    return undefined;
  }

  initSettings() {
    this.settingsService.init();

    this.settings.forEach(section => {
      section.settings.forEach(setting => {
        if (this.isSettingSwitch(setting)) {
          setting.subject$.subscribe(value => {
            this.findControlByName(setting.formControlName)?.patchValue(value);
          });
        }
        if (this.isSettingSelect(setting)) {
          setting.subject$.subscribe(value => {
            const control = this.findControlByName(setting.formControlName);
            control?.patchValue(value);
          });
        }
        if (this.isSettingNumber(setting)) {
          setting.subject$.subscribe(value => {
            const control = this.findControlByName(setting.formControlName);
            control?.patchValue(value);
          });
        }
      });
    });
  }

  setBooleanSetting(event: Event, key: string) {
    const target = event.target as HTMLInputElement;
    const show = target.checked;
    this.settingsService.setBooleanSetting(key, show);
  }

  setSelectSetting(event: Event, key: string) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.settingsService.setSelectSetting(key, value);
  }

  setNumberSetting(event: Event, key: string) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.settingsService.setNumberSetting(key, parseFloat(value));
  }

  isSettingSwitch(setting: Setting): setting is SettingSwitch {
    return setting.type === 'switch';
  }

  isSettingSelect(setting: Setting): setting is SettingSelect {
    return setting.type === 'select';
  }

  isSettingNumber(setting: Setting): setting is SettingNumber {
    return setting.type === 'number';
  }
}
