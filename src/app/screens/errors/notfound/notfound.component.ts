import { Component } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [LayoutComponent, TranslateModule, CustomTranslatePipe],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent extends LanguageComponent {
  constructor() {
    super('SCREENS.NOT-FOUND');
  }
}
