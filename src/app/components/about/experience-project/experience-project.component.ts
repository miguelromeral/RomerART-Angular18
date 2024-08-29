import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { IExperience } from '@models/about/cv.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { formattedDateMini } from '@utils/customization/date-utils';
import { sortTechnologyByLevel } from '@utils/sorting/sort-utils';
import { settingLanguage } from 'config/settings/language.config';

@Component({
  selector: 'app-experience-project',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTranslatePipe],
  templateUrl: './experience-project.component.html',
  styleUrl: './experience-project.component.scss',
})
export class ExperienceProjectComponent
  extends LanguageComponent
  implements OnInit
{
  @Input() project!: IExperience;
  currentLanguage: string = settingLanguage.defaultValue;

  constructor(private languageService: LanguageService) {
    super('SCREENS.CV.EXPERIENCE');
  }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  sortedTechnology() {
    return this.project.tecnology?.sort(sortTechnologyByLevel);
  }

  formatDateMini(date: Date) {
    return formattedDateMini(date, this.currentLanguage);
  }
}
