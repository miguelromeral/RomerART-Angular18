import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { localStorageKey, loginPath } from 'config/auth/auth.config';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  private redirectToLogin() {
    this.router.navigate([loginPath]);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.authService.uptadeRedirectUrl(state.url);
    const token = localStorage.getItem(localStorageKey);

    if (!token) {
      this.redirectToLogin();
      return false;
    }

    return this.authService.validateToken(token).pipe(
      map(valid => {
        if (valid) {
          return true;
        } else {
          console.log('El token enviado no es válido');
          this.redirectToLogin();
          return false;
        }
      }),
      catchError(err => {
        console.log('Error al validar el token', err);
        this.redirectToLogin();
        return of(false);
      })
    );
  }
}
