import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { SectionComponent } from '@app/components/common/layout/section/section.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-index-screen',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    TranslateModule,
    CustomTranslatePipe,
    RouterLink,
    SectionComponent,
  ],
  templateUrl: './admin-index-screen.component.html',
  styleUrl: './admin-index-screen.component.scss',
})
export class AdminIndexScreenComponent extends LanguageComponent {
  constructor(private authService: AuthService) {
    super('SCREENS.ADMIN');
  }

  logout() {
    this.authService.logout();
  }
}
