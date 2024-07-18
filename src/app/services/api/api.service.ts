import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Drawing } from '../../../models/art/drawing.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  // Método para obtener datos
  getDrawingDetails(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details/${id}`)
      .pipe(catchError(this.handleError<Drawing>('getArtDetails')));
  }

  // // Método para enviar datos
  // updateArtDetails(details: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http
  //     .put<any>(this.apiUrl, details, httpOptions)
  //     .pipe(catchError(this.handleError<any>('updateArtDetails')));
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
