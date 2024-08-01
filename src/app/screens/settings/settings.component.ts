import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SettingSectionComponent } from '@app/components/settings/setting-section/setting-section.component';
import { LanguageService } from '@app/services/language/language.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  IAvailableLanguage,
  ITailwindTheme,
  settingLanguage,
  settingTheme,
} from 'config/settings/local-storage.config';
import { LayoutComponent } from '../../components/shared/layout/layout.component';
import { ThemeService } from '@app/services/theme/theme.service';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { RouterLink } from '@angular/router';
import { loginPath } from 'config/auth/auth.config';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    TranslateModule,
    CustomTranslatePipe,
    NgFor,
    SettingSectionComponent,
    LayoutComponent,
    LayoutComponent,
    CustomTranslatePipe,
    RouterLink,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
// implements OnInit, OnDestroy
export class SettingsComponent extends LanguageComponent implements OnInit {
  loginPath = loginPath;

  currentLanguage = settingLanguage.defaultValue;
  currentTheme = settingTheme.defaultValue;

  languages: IAvailableLanguage[] = settingLanguage.options;
  themes: ITailwindTheme[] = settingTheme.options;

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
      this.currentLanguage = newLang;
    });

    this.currentTheme = this.themeService.getTheme();
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
