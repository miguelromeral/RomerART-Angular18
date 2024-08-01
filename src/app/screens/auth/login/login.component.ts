import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /* Filter Form */
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    this.authService.login({ username, password }).subscribe(
      response => {
        this.authService.saveAuthToken(response.token);
        this.router.navigate(['admin']);
      },
      err => {
        console.log('Error al recivir el token: ' + err);
      }
    );
  }
}
