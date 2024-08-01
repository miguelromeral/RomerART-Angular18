import { Component, OnInit, OnDestroy } from '@angular/core';
import $ from 'jquery';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '@app/services/language/language.service';
import { Subscription } from 'rxjs';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { AuthService } from '@app/services/api/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [TranslateModule, CustomTranslatePipe, LayoutComponent, RouterLink],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent implements OnInit, OnDestroy {
  private languageSub: Subscription | undefined;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de idioma
    this.languageSub = this.languageService.currentLanguage$.subscribe(() => {
      this.updateText();
    });

    // Actualizar el texto inicialmente
    this.updateText();
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.languageService.changeLanguage(lang);
  }

  ngOnDestroy() {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
  }

  private updateText() {
    this.languageService.translateText('TITLE').subscribe((res: string) => {
      $('#debug').text(res);
    });
  }
}
