import { Component } from '@angular/core';
import $ from 'jquery';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '@app/services/language/language.service';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { AuthService } from '@app/services/api/auth/auth.service';
import { RouterLink } from '@angular/router';
import { AlertService } from '@app/services/alerts/alert.service';

@Component({
  selector: 'app-debug-screen',
  standalone: true,
  imports: [TranslateModule, CustomTranslatePipe, LayoutComponent, RouterLink],
  templateUrl: './debug-screen.component.html',
  styleUrl: './debug-screen.component.scss',
})
export class DebugScreenComponent {
  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  showAlert(): void {
    this.alertService.showAlert('Alerta', 'Mensaje');
  }
}
