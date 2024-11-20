import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { IExperience } from '@models/about/cv.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { formattedDateMini } from '@utils/customization/date-utils';
import { sortTechnologyByLevel } from '@utils/sorting/sort-utils';
import { settingLanguage } from '../../../../../config/settings/language.config';
import { settingFormatDate } from '../../../../../config/settings/local-storage.config';

@Component({
  selector: 'app-cv-experience-project',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTranslatePipe],
  templateUrl: './cv-experience-project.component.html',
  styleUrl: './cv-experience-project.component.scss',
})
export class CvExperienceProjectComponent
  extends LanguageComponent
  implements OnInit
{
  @Input() project!: IExperience;
  currentLanguage: string = settingLanguage.defaultValue;
  currentFormatDate: string = settingFormatDate.defaultValue;

  constructor(
    private languageService: LanguageService,
    private settingsService: SettingsService
  ) {
    super('SCREENS.CV.EXPERIENCE');
  }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    this.settingsService.selectSetting$(settingFormatDate).subscribe(format => {
      this.currentFormatDate = format;
    });
  }

  sortedTechnology() {
    return this.project.tecnology?.sort(sortTechnologyByLevel);
  }

  formatDateMini(date: Date) {
    return formattedDateMini(
      date,
      this.currentLanguage,
      this.currentFormatDate
    );
  }
}
