import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  catchError,
  map,
  Observable,
  switchMap,
  throwError,
  timeout,
} from 'rxjs';
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
import { ISaveCollectionRequest } from '@models/requests/save-collection-request.model';
import { AuthService } from '../auth/auth.service';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { DrawingFilterEffect } from '@models/art/drawing-filter-effect.model';
import { drawingFilterEffects } from 'config/data/drawing-filter-effect.config';
import { UploadAzureBlobResponse } from '@models/responses/upload-azure-blob.response';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrl = `${environment.api.url}art/`;

  private timeoutMs = 30 * 1000;

  public postHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getDrawingStyles = (): DrawingStyle[] =>
    drawingStyles.map(style => new DrawingStyle(style));

  getDrawingProductTypes = (): DrawingProductType[] =>
    drawingProductTypes.map(type => new DrawingProductType(type));

  getDrawingSoftwares = (): DrawingSoftware[] =>
    drawingSoftwares.map(sw => new DrawingSoftware(sw));

  getDrawingFilterEffects = (): DrawingFilterEffect[] =>
    drawingFilterEffects.map(f => new DrawingFilterEffect(f));

  getDrawingPaperSizes = (): DrawingPaperSize[] =>
    drawingPaperSizes.map(paper => new DrawingPaperSize(paper));

  /**********************************/
  /* Drawing Selects
  /**********************************/

  getDrawingProducts(): Observable<DrawingProduct[]> {
    return this.http
      .get<DrawingProduct[]>(`${this.apiUrl}drawing/products`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  getDrawingCharacters(): Observable<DrawingCharacter[]> {
    return this.http
      .get<DrawingCharacter[]>(`${this.apiUrl}drawing/characters`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  getDrawingModels(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}drawing/models`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  /**********************************/
  /* Drawing Details
  /**********************************/

  getDrawingDetails(id: string): Observable<Drawing> {
    return this.authService.isAdmin().pipe(
      switchMap(authorized => {
        return authorized
          ? this.getDrawingDetailsAdmin(id)
          : this.getDrawingDetailsPublic(id);
      })
    );
  }

  private getDrawingDetailsPublic(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}drawing/details/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }
  private getDrawingDetailsAdmin(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}drawing/full-details/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  /**********************************/
  /* Drawing Filters
  /**********************************/

  filterDrawings(filters: DrawingFilter): Observable<FilterResultsDrawing> {
    return this.authService.isAdmin().pipe(
      switchMap(authorized => {
        return authorized
          ? this.filterDrawingsAdmin(filters)
          : this.filterDrawingsPublic(filters);
      })
    );
  }

  private filterDrawingsPublic(
    filters: DrawingFilter
  ): Observable<FilterResultsDrawing> {
    const url = `${this.apiUrl}drawing/filter`;
    return this.http
      .post<FilterResultsDrawing>(url, filters, { headers: this.postHeaders })
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map(
          (results: FilterResultsDrawing) => new FilterResultsDrawing(results)
        )
      );
  }

  filterDrawingsAdmin(
    filters: DrawingFilter
  ): Observable<FilterResultsDrawing> {
    const url = `${this.apiUrl}drawing/full-filter`;
    return this.http
      .post<FilterResultsDrawing>(url, filters, { headers: this.postHeaders })
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map(
          (results: FilterResultsDrawing) => new FilterResultsDrawing(results)
        )
      );
  }

  getAllDrawingsOfCollection(
    collectionId: string
  ): Observable<FilterResultsDrawing> {
    const filters = new DrawingFilter({ collection: collectionId });
    return this.filterDrawings(filters);
  }

  /**********************************/
  /* Drawing Interactions
  /**********************************/

  cheerDrawing(id: string): Observable<unknown> {
    const url = `${this.apiUrl}drawing/cheer`;

    return this.http
      .post<void>(url, JSON.stringify(id), { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  voteDrawing(id: string, score: number): Observable<IVoteDrawingResponse> {
    const url = `${this.apiUrl}drawing/vote/${id}`;

    return this.http
      .post<IVoteDrawingResponse>(url, JSON.stringify(score), {
        headers: this.postHeaders,
      })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  /**********************************/
  /* Drawing Form
  /**********************************/

  saveDrawing(drawing: ISaveDrawingRequest): Observable<Drawing> {
    const url = `${this.apiUrl}drawing/save/${drawing.id}`;

    return this.http
      .post<Drawing>(url, drawing, { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  checkDrawingId(id: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}drawing/exist/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  checkAzurePath(path: string): Observable<ICheckAzurePathResponse> {
    const url = `${this.apiUrl}drawing/check/blob`;

    const body: ICheckAzurePathRequest = {
      id: path,
    };
    return this.http
      .post<ICheckAzurePathResponse>(url, body, { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  uploadAzureImage(form: FormData): Observable<UploadAzureImageResponse> {
    const url = `${this.apiUrl}drawing/upload/image`;
    return this.http
      .post<UploadAzureImageResponse>(url, form)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  uploadAzureBlob(form: FormData): Observable<UploadAzureBlobResponse> {
    const url = `${this.apiUrl}drawing/upload/blob`;
    return this.http
      .post<UploadAzureBlobResponse>(url, form)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  /**********************************/
  /* Collection Details
  /**********************************/

  getCollectionDetails(id: string): Observable<Collection> {
    return this.authService.isAdmin().pipe(
      switchMap(authorized => {
        return authorized
          ? this.getCollectionDetailsAdmin(id)
          : this.getCollectionDetailsPublic(id);
      })
    );
  }

  getCollectionDetailsPublic(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}collection/details/${id}`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collection: Collection) => new Collection(collection))
      );
  }

  getCollectionDetailsAdmin(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}collection/full-details/${id}`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collection: Collection) => new Collection(collection))
      );
  }

  /**********************************/
  /* Collection List
  /**********************************/

  getAllCollections(): Observable<Collection[]> {
    return this.authService.isAdmin().pipe(
      switchMap(authorized => {
        return authorized
          ? this.getAllCollectionsAdmin()
          : this.getAllCollectionsPublic();
      })
    );
  }

  getAllCollectionsPublic(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}collection/list`).pipe(
      timeout(this.timeoutMs),
      catchError(this.handleRequestError),
      map((collections: Collection[]) =>
        collections.map(collection => new Collection(collection))
      )
    );
  }

  getAllCollectionsAdmin(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${this.apiUrl}collection/full-list`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collections: Collection[]) =>
          collections.map(collection => new Collection(collection))
        )
      );
  }

  /**********************************/
  /* Collection Form
  /**********************************/

  checkCollectionId(id: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}collection/exist/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  saveCollection(collection: ISaveCollectionRequest): Observable<Collection> {
    const url = `${this.apiUrl}collection/save/${collection.id}`;

    return this.http
      .post<Collection>(url, collection, { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  removeCollection(id: string): Observable<void> {
    const url = `${this.apiUrl}collection/delete`;

    return this.http
      .post<void>(url, JSON.stringify(id), { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  ////////////////////////////////////////////////////////

  private handleRequestError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage =
            'Solicitud incorrecta. Por favor revisa los datos enviados.';
          break;
        case 404:
          errorMessage = 'No se encontraron productos.';
          break;
        case 500:
          errorMessage =
            'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
          break;
        default:
          errorMessage = error.message;
          break;
      }
    }

    // Puedes agregar un servicio de notificación o simplemente hacer el throwError
    return throwError(() => new Error(errorMessage));
  }
}
