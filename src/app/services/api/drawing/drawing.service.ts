import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Drawing } from '../../../../models/art/drawing.model';
import { DrawingStyle } from '@models/art/drawing-style.model';
import { DrawingProductType } from '@models/art/drawing-product-type.model';
import { DrawingSoftware } from '@models/art/drawing-software.model';
import { DrawingPaperSize } from '@models/art/drawing-paper-size.model';
import { DrawingProduct } from '@models/art/drawing-product.model';
import { DrawingCharacter } from '@models/art/drawing-character.model';
import { DrawingFilter } from '@models/art/drawing-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  getDrawingStyles = (): DrawingStyle[] =>
    environment.data.styles.map(style => new DrawingStyle(style));

  getDrawingProductTypes = (): DrawingProductType[] =>
    environment.data.productTypes.map(type => new DrawingProductType(type));

  getDrawingSoftwares = (): DrawingSoftware[] =>
    environment.data.softwares.map(sw => new DrawingSoftware(sw));

  getDrawingPaperSizes = (): DrawingPaperSize[] =>
    environment.data.paperSizes.map(paper => new DrawingPaperSize(paper));

  getDrawingDetails(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details/${id}`)
      .pipe(catchError(this.handleError<Drawing>('getArtDetails')));
  }

  getAllDrawings(): Observable<Drawing[]> {
    return this.http
      .get<Drawing[]>(`${this.apiUrl}art/drawings`)
      .pipe(catchError(this.handleError<Drawing[]>('getAllDrawings')));
  }

  getDrawingProducts(): Observable<DrawingProduct[]> {
    return this.http
      .get<DrawingProduct[]>(`${this.apiUrl}art/select/products`)
      .pipe(
        catchError(this.handleError<DrawingProduct[]>('getDrawingProducts'))
      );
  }

  getDrawingCharacters(): Observable<DrawingCharacter[]> {
    return this.http
      .get<DrawingCharacter[]>(`${this.apiUrl}art/select/characters`)
      .pipe(
        catchError(this.handleError<DrawingCharacter[]>('getDrawingCharacters'))
      );
  }

  getDrawingModels(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}art/select/models`)
      .pipe(catchError(this.handleError<string[]>('getDrawingModels')));
  }

  cheerDrawing(id: string): Observable<void> {
    const url = `${this.apiUrl}art/cheer`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<void>(url, JSON.stringify(id), { headers })
      .pipe(catchError(this.handleError<void>('cheer')));
  }

  filterDrawings(filters: DrawingFilter): Observable<Drawing[]> {
    const url = `${this.apiUrl}art/filter`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('Filters', filters);
    return this.http
      .post<Drawing[]>(url, filters, { headers })
      .pipe(catchError(this.handleError<Drawing[]>('filterDrawings')));
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
