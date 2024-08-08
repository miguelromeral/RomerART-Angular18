import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { SectionComponent } from '@app/components/shared/section/section.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    TranslateModule,
    CustomTranslatePipe,
    RouterLink,
    SectionComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent extends LanguageComponent {
  constructor(private authService: AuthService) {
    super('SCREENS.ADMIN');
  }

  logout() {
    this.authService.logout();
  }
}
