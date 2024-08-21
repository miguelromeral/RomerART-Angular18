import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { IExperience } from '@models/about/cv.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { formattedDateMini } from '@utils/customization/date-utils';

@Component({
  selector: 'app-experience-project',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTranslatePipe],
  templateUrl: './experience-project.component.html',
  styleUrl: './experience-project.component.scss',
})
export class ExperienceProjectComponent extends LanguageComponent {
  @Input() project!: IExperience;

  constructor() {
    super('SCREENS.CV.EXPERIENCE');
  }

  sortedTechnology() {
    return this.project.tecnology?.sort(
      (a, b) => (b.level ?? 0) - (a.level ?? 0)
    );
  }

  formatDateMini(date: Date) {
    return formattedDateMini(date);
  }
}
