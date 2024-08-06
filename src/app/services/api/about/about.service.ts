import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inspiration } from '@models/about/inspiration.model';
import { environment } from 'environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  getInspirations(): Observable<Inspiration[]> {
    return this.http
      .get<Inspiration[]>(`${this.apiUrl}about/inspirations`)
      .pipe(catchError(this.handleError<Inspiration[]>('getInspirations')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
