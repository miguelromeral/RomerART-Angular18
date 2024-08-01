import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  canActivate(): Observable<boolean> | boolean {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

    return this.authService.validateToken(token).pipe(
      map(valid => {
        if (valid) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError(err => {
        console.log('El token enviado no es válido: ', err);
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
