import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { TranslateService } from '@app/services/translate/translate.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  settingLanguage,
  settingTranslations,
} from 'config/settings/local-storage.config';

@Component({
  selector: 'app-translatable',
  standalone: true,
  imports: [NgIf, TranslateModule, CustomTranslatePipe, NgClass],
  templateUrl: './translatable.component.html',
  styleUrl: './translatable.component.scss',
})
export class TranslatableComponent extends LanguageComponent implements OnInit {
  private _originalText!: string;
  translation = '';
  destionationLanguage = settingLanguage.defaultValue;
  bShowTranslation = false;

  bSettingEnabled = settingTranslations.defaultValue;

  @Input()
  public get originalText() {
    return this._originalText;
  }
  public set originalText(value: string) {
    this._originalText = value;
  }

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private settingsService: SettingsService
  ) {
    super('COMPONENTS.TRANSLATABLE');
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(newLang => {
      this.destionationLanguage = newLang;
    });

    this.settingsService.translations$.subscribe(value => {
      this.bSettingEnabled = value;
    });

    // this.bSettingEnabled = this.settingsService.translations$;
  }

  translate() {
    if (this.originalText !== '') {
      if (this.translation === '') {
        this.translateService
          .translate(this.originalText, this.destionationLanguage)
          .subscribe(res => {
            if (res && res.length > 0) {
              const translations = res[0].translations;
              if (translations && translations.length > 0) {
                this.translation = translations[0].text;
                this.bShowTranslation = true;
              }
            }
          });
      } else {
        this.bShowTranslation = !this.bShowTranslation;
      }
    }
  }
}
