import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FfHandContainerComponent } from '@app/components/about/ff/ff-hand-container/ff-hand-container.component';
import { FfMateriaComponent } from '@app/components/about/ff/ff-materia/ff-materia.component';
import { FfPanelComponent } from '@app/components/about/ff/ff-panel/ff-panel.component';
import { FfProgressBarComponent } from '@app/components/about/ff/ff-progress-bar/ff-progress-bar.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AboutService } from '@app/services/api/about/about.service';
import { Inspiration } from '@models/about/inspiration.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { yearsDifference } from '@utils/customization/date-utils';
import { getRandomNumber } from '@utils/number-utils';
import {
  healthConfig,
  magicConfig,
  myBirthday,
} from 'config/data/about.config';
import {
  ISocialLink,
  socialLinksConfig,
} from 'config/data/social-links.config';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    CustomTranslatePipe,
    LayoutComponent,
    FfPanelComponent,
    FfProgressBarComponent,
    FfHandContainerComponent,
    FfMateriaComponent,
  ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
})
export class MeComponent extends LanguageComponent implements OnInit {
  listInspirations: Inspiration[] = [];

  birthday = myBirthday;
  age = 0;
  healthPoints = 0;
  maxHealth = healthConfig.max;
  magicPoints = 0;
  maxMagic = magicConfig.max;

  socialLinks: ISocialLink[] = socialLinksConfig.filter(x => x.showInAbout);

  constructor(private apiService: AboutService) {
    super('SCREENS.ABOUT.ME');
  }

  ngOnInit() {
    this.apiService.getInspirations().subscribe(list => {
      this.listInspirations = list;
    });
    this.age = yearsDifference(this.birthday, new Date(Date.now()));
    this.healthPoints = getRandomNumber(healthConfig.min, healthConfig.max);
    this.magicPoints = getRandomNumber(magicConfig.min, magicConfig.max);
  }
}
