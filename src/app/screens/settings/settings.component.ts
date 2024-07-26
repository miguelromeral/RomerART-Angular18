import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SettingSectionComponent } from '@app/components/settings/setting-section/setting-section.component';
import { LanguageService } from '@app/services/language/language.service';
import { LocalStorageService } from '@app/services/local-storage/local-storage.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { Language } from '@models/language.model';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageConfig } from 'config/settings/local-storage.config';
import { environment } from 'environments/environment';
import { LayoutComponent } from '../../components/shared/layout/layout.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    TranslateModule,
    NgFor,
    SettingSectionComponent,
    LayoutComponent,
    LayoutComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
// implements OnInit, OnDestroy
export class SettingsComponent extends LanguageComponent implements OnInit {
  currentLanguage = environment.language.default;
  languages: Language[] = environment.language.available;

  constructor(
    private languageService: LanguageService,
    private localStorageService: LocalStorageService
  ) {
    super('SCREENS.SETTINGS');
  }

  ngOnInit() {
    this.initSettings();
  }

  initSettings() {
    // Restore current language
    this.currentLanguage =
      this.localStorageService.getItem<string>(
        LocalStorageConfig.localStorageKeys.language
      ) ?? environment.language.default;
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    // Notify every other component language has changed
    this.languageService.changeLanguage(lang);
    // Save current language info
    this.localStorageService.setItem<string>(
      LocalStorageConfig.localStorageKeys.language,
      lang
    );
  }
}
