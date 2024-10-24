import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends LanguageComponent {
  /* Filter Form */
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super('SCREENS.LOGIN');
  }

  login() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    if (this.loginForm.valid) {
      this.authService.login({ username, password }).subscribe(
        response => {
          if (response) {
            this.authService.saveLoggedUser(response);
            this.router.navigate([this.authService.getRedirectUrl()]);
          }
        },
        err => {
          console.log('Error al recibir el token: ', err);
        }
      );
    }
  }
}
