import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    private localStorageService: LocalStorageService
  ) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}account/login`, credentials);
  }

  // TODO: Buscar referencias del access_token y sustituirlo por una config
  saveAuthToken(token: string) {
    this.localStorageService.setItem('access_token', token);
  }
}
