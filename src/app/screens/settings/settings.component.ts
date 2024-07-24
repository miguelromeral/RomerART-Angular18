import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '@app/services/language/language.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { Language } from '@models/language.model';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
// implements OnInit, OnDestroy
export class SettingsComponent extends LanguageComponent {
  // private languageSub: Subscription | undefined;

  currentLanguage = environment.language.default;
  languages: Language[] = environment.language.available;

  constructor(private languageService: LanguageService) {
    super('SCREENS.SETTINGS');
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.languageService.changeLanguage(lang);
  }

  // ngOnDestroy() {
  //   if (this.languageSub) {
  //     this.languageSub.unsubscribe();
  //   }
  // }
}
