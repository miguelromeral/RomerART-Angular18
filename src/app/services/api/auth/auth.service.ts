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
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.api.url;

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
  }

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

  logout() {
    localStorage.removeItem(localStorageKey);
    this.router.navigate([loginPath]);
    this.loggedUserSubject.next(null);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem(localStorageKey) !== null;
  }

  saveLoggedUser(newUser: User) {
    this.loggedUserSubject.next(newUser);
    this.localStorageService.setItem(
      loggedUserLocalStorageKey,
      JSON.stringify(newUser)
    );
    this.localStorageService.setItem(localStorageKey, newUser.token);
  }
}
