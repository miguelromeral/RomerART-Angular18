import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExperienceProjectComponent } from '@app/components/about/experience-project/experience-project.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
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
} from 'config/about/cv.config';
import { settingLanguage } from 'config/settings/language.config';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
    ExperienceProjectComponent,
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent extends LanguageComponent implements OnInit {
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

  constructor(private languageService: LanguageService) {
    super('SCREENS.CV');
  }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  getCodingByLevel(level: undefined | 1 | 2 | 3) {
    return this.tecnology.coding.filter(x => x.level === level);
  }

  formattedDateMini(date: Date) {
    return formattedDateMini(date, this.currentLanguage);
  }

  printDocument(): void {
    window.print();
  }
}