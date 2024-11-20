import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage/local-storage.service';
import { User } from '@models/auth/user.model';
import {
  localStorageKey,
  loggedUserLocalStorageKey,
  loginPath,
} from 'config/auth/auth.config';
import { environment } from 'environments/environment';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.api.url;

  redirectUrlAfterLogin = '/admin';

  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  loggedUser$: Observable<User | null> = this.loggedUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  init() {
    const loggedUserString = this.localStorageService.getItem(
      loggedUserLocalStorageKey
    );

    if (loggedUserString !== null) {
      this.saveLoggedUser(JSON.parse(loggedUserString));
    }

    const token = this.getToken(); // O el método correspondiente

    if (token) {
      const isTokenExpired = this.isTokenExpired(token);

      if (isTokenExpired) {
        this.logout();
      }
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos

      if (decodedToken?.exp !== undefined) {
        return decodedToken.exp < currentTime;
      }
    } catch (e) {
      console.error('Error decoding token', e);
    }
    return true; // En caso de error, consideramos el token como caducado
  }

  // TODO: retornar respuesta y que se muestre al usuario en caso de login fallido
  login(credentials: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}auth/login`, credentials);
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}auth/validate-token`, {
      token,
    });
  }

  getInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}account/info`);
  }

  getToken(): string | null {
    return this.localStorageService.getItem(localStorageKey);
  }

  logout() {
    this.localStorageService.removeItem(localStorageKey);
    this.localStorageService.removeItem(loggedUserLocalStorageKey);
    this.router.navigate([loginPath]);
    this.loggedUserSubject.next(null);
  }

  public get loggedIn(): boolean {
    return this.localStorageService.getItem(localStorageKey) !== null;
  }

  saveLoggedUser(newUser: User) {
    this.loggedUserSubject.next(newUser);
    this.localStorageService.setItem(
      loggedUserLocalStorageKey,
      JSON.stringify(newUser)
    );
    this.localStorageService.setItem(localStorageKey, newUser.token);
  }

  isAdmin(): Observable<boolean> {
    return this.loggedUser$.pipe(switchMap(user => this.isAdminUser(user)));
  }

  isAdminUser(user: User | null): Observable<boolean> {
    if (!user) {
      return of(false); // Si no hay usuario, retorna inmediatamente 'false'
    }
    return this.validateToken(user.token).pipe(
      map((result: boolean) => result && user.role === 'admin') // Si el token es válido y el rol es 'admin', retorna true
    );
  }

  uptadeRedirectUrl(url: string) {
    this.redirectUrlAfterLogin = url;
  }

  getRedirectUrl() {
    return this.redirectUrlAfterLogin;
  }
}
