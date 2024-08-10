import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@app/services/language/language.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  settingLanguage,
  settingTheme,
} from 'config/settings/local-storage.config';
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
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
// implements OnInit, OnDestroy
export class SettingsComponent extends LanguageComponent implements OnInit {
  loginPath = loginPath;

  languages: ICustomSelectOption[] = settingLanguage.options;
  themes: ICustomSelectOption[] = settingTheme.options;

  providers = providersConfigList;

  settingsForm = new FormGroup({
    langFormControl: new FormControl('en'),
    themeFormControl: new FormControl('system'),
  });

  constructor(
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {
    super('SCREENS.SETTINGS');
  }

  ngOnInit() {
    this.initSettings();
    this.languageService.translateText(this.text('TITLE')).subscribe(text => {
      this.metadataService.updateTitle(text);
    });
  }

  initSettings() {
    this.languageService.currentLanguage$.subscribe(newLang => {
      this.settingsForm.controls.langFormControl.setValue(newLang);
    });

    this.settingsForm.controls.themeFormControl.setValue(
      this.themeService.getTheme()
    );
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    this.languageService.changeLanguage(lang);
  }

  changeTheme(event: Event) {
    const target = event.target as HTMLSelectElement;
    const theme = target.value;

    this.themeService.setTheme(theme);
  }
}
