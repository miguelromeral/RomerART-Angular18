import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  formattedDateMini,
  yearsDifference,
} from '@utils/customization/date-utils';
import {
  certificationsConfig,
  experienceConfig,
  experienceLanguagesConfig,
  experienceLinksConfig,
  experienceTecnologyConfig,
  personalInfoConfig,
  personalProjectsConfig,
  personalStrengthsConfig,
} from '../../../../config/about/cv.config';
import { settingLanguage } from '../../../../config/settings/language.config';
import { settingFormatDate } from '../../../../config/settings/local-storage.config';
import { CvExperienceProjectComponent } from '@app/components/about/cv/cv-experience-project/cv-experience-project.component';

@Component({
  selector: 'app-about-cv-screen',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
    CvExperienceProjectComponent,
  ],
  templateUrl: './about-cv-screen.component.html',
  styleUrl: './about-cv-screen.component.scss',
})
export class AboutCvScreenComponent
  extends LanguageComponent
  implements OnInit
{
  personalInfo = personalInfoConfig;
  age = yearsDifference(this.personalInfo.birthday, new Date(Date.now()));
  experience = experienceConfig;
  languages = experienceLanguagesConfig;
  tecnology = experienceTecnologyConfig;
  certifications = certificationsConfig;
  projects = personalProjectsConfig;
  strengths = personalStrengthsConfig;
  links = experienceLinksConfig;
  currentLanguage: string = settingLanguage.defaultValue;
  currentFormatDate: string = settingFormatDate.defaultValue;

  constructor(
    private languageService: LanguageService,
    private settingsService: SettingsService
  ) {
    super('SCREENS.CV');
  }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    this.settingsService.selectSetting$(settingFormatDate).subscribe(format => {
      this.currentFormatDate = format;
    });
  }

  getCodingByLevel(level: undefined | 1 | 2 | 3) {
    return this.tecnology.coding.filter(x => x.level === level);
  }

  formattedDateMini(date: Date) {
    return formattedDateMini(
      date,
      this.currentLanguage,
      this.currentFormatDate
    );
  }

  printDocument(): void {
    window.print();
  }
}
