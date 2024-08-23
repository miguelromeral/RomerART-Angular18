import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';
import { routesWithoutAuth } from 'config/api/api.config';
import { jwtDecode } from 'jwt-decode'; // Importa la librería para decodificar el token
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verifica si la URL está en las rutas excluidas
    if (this.isExcludedRoute(req.url)) {
      return next.handle(req);
    }

    const token = this.authService.getToken(); // O el método correspondiente

    if (token) {
      // const isTokenExpired = this.authService.isTokenExpired(token);

      // if (isTokenExpired) {
      //   this.authService.logout(); // O el método correspondiente para eliminar el token
      //   this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      //   return throwError(() => new Error('Token has expired')); // Interrumpe la solicitud
      // }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }

  private isExcludedRoute(url: string): boolean {
    return routesWithoutAuth.some(route => url.includes(route));
  }
}
