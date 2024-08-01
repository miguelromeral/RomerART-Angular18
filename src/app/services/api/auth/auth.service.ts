import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage/local-storage.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.api.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}account/login`, credentials);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  // TODO: Buscar referencias del access_token y sustituirlo por una config
  saveAuthToken(token: string) {
    this.localStorageService.setItem('access_token', token);
  }
}
