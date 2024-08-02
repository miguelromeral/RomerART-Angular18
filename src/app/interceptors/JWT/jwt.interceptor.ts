import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';
import { routesWithoutAuth } from 'config/api/api.config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

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
