import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Drawing } from '../../../../models/art/drawing.model';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  getDrawingDetails(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details/${id}`)
      .pipe(catchError(this.handleError<Drawing>('getArtDetails')));
  }

  cheerDrawing(id: string): Observable<void> {
    const url = `${this.apiUrl}art/cheer`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<void>(url, JSON.stringify(id), { headers })
      .pipe(catchError(this.handleError<void>('cheer')));
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
