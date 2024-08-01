import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    this.authService
      .login({ username: 'usuario', password: 'contraseña' })
      .subscribe(
        response => {
          this.authService.saveAuthToken(response.token);
        },
        err => {
          console.log('Error al recivir el token: ' + err);
        }
      );
  }
}
