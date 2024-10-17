import { Component } from '@angular/core';
import $ from 'jquery';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '@app/services/language/language.service';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { AuthService } from '@app/services/api/auth/auth.service';
import { RouterLink } from '@angular/router';
import { AlertService } from '@app/services/alerts/alert.service';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [TranslateModule, CustomTranslatePipe, LayoutComponent, RouterLink],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent {
  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  showAlert(): void {
    this.alertService.showAlert('Alerta', 'Mensaje');
  }
}
