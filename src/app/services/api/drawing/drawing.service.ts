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
import { Collection } from '@models/art/collection.model';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';
import { ICheckAzurePathRequest } from '@models/requests/check-azure-path-request.model';
import { ICheckAzurePathResponse } from '@models/responses/check-azure-path-response.model';
import { UploadAzureImageResponse } from '@models/responses/upload-azure-image.response';
import { ISaveDrawingRequest } from '@models/requests/save-drawing-request.model';
import { drawingStyles } from 'config/data/drawing-styles.config';
import { drawingProductTypes } from 'config/data/drawing-product-types.config';
import { drawingSoftwares } from 'config/data/drawing-softwares.config';
import { drawingPaperSizes } from 'config/data/drawing-paper-sizes.config';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  getDrawingStyles = (): DrawingStyle[] =>
    drawingStyles.map(style => new DrawingStyle(style));

  getDrawingProductTypes = (): DrawingProductType[] =>
    drawingProductTypes.map(type => new DrawingProductType(type));

  getDrawingSoftwares = (): DrawingSoftware[] =>
    drawingSoftwares.map(sw => new DrawingSoftware(sw));

  getDrawingPaperSizes = (): DrawingPaperSize[] =>
    drawingPaperSizes.map(paper => new DrawingPaperSize(paper));

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
      .pipe(catchError(this.handleError<void>('cheerDrawing')));
  }

  voteDrawing(id: string, score: number): Observable<IVoteDrawingResponse> {
    const url = `${this.apiUrl}art/vote/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<IVoteDrawingResponse>(url, JSON.stringify(score), { headers })
      .pipe(catchError(this.handleError<IVoteDrawingResponse>('voteDrawing')));
  }

  checkAzurePath(path: string): Observable<ICheckAzurePathResponse> {
    const url = `${this.apiUrl}art/checkazurepath`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body: ICheckAzurePathRequest = {
      id: path,
    };
    return this.http
      .post<ICheckAzurePathResponse>(url, body, { headers })
      .pipe(
        catchError(this.handleError<ICheckAzurePathResponse>('checkAzurePath'))
      );
  }

  saveDrawing(drawing: ISaveDrawingRequest): Observable<Drawing> {
    const url = `${this.apiUrl}art/save/${drawing.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Drawing>(url, drawing, { headers })
      .pipe(catchError(this.handleError<Drawing>('saveDrawing')));
  }

  uploadAzureImage(form: FormData): Observable<UploadAzureImageResponse> {
    const url = `${this.apiUrl}art/upload`;
    return this.http
      .post<UploadAzureImageResponse>(url, form)
      .pipe(
        catchError(
          this.handleError<UploadAzureImageResponse>('uploadAzureImage')
        )
      );
  }

  checkDrawingId(id: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}art/checkdrawing/${id}`)
      .pipe(catchError(this.handleError<boolean>('checkDrawingId')));
  }

  filterDrawings(filters: DrawingFilter): Observable<Drawing[]> {
    const url = `${this.apiUrl}art/filter`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // console.log('Filters', filters);
    // console.log('Page Number', filters.pageNumber);
    return this.http
      .post<Drawing[]>(url, filters, { headers })
      .pipe(catchError(this.handleError<Drawing[]>('filterDrawings')));
  }

  getAllDrawingsOfCollection(collectionId: string): Observable<Drawing[]> {
    const filters = new DrawingFilter({ collection: collectionId });
    return this.filterDrawings(filters);
  }

  getAllCollections(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${this.apiUrl}art/collections`)
      .pipe(catchError(this.handleError<Collection[]>('getAllCollections')));
  }

  getCollectionDetails(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}art/collection/details/${id}`)
      .pipe(catchError(this.handleError<Collection>('getCollectionDetails')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
