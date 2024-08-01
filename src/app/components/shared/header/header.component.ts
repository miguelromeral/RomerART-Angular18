import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, TranslateModule, CustomTranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends LanguageComponent {
  production = environment.production;
  version = environment.appVersion;

  constructor() {
    super('SCREENS.HEADER');
  }
}
