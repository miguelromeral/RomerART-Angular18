import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
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
import { User } from '@models/auth/user.model';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { DrawingFilterEffect } from '@models/art/drawing-filter-effect.model';
import { drawingFilterEffects } from 'config/data/drawing-filter-effect.config';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private apiUrl = environment.api.url;

  private user: User | null = null;
  private isAdmin = false;
  private timeoutMs = 30 * 1000;

  public postHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.loggedUser$.subscribe(user => {
      this.user = user;
      // this.authService.isAdminUser(user).subscribe(admin => {
      //   this.isAdmin = admin;
      // });
    });
    this.authService.isAdmin().subscribe(admin => {
      // console.log('Setting admin: ', admin);
      this.isAdmin = admin;
    });
  }

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

  getDrawingDetails(id: string): Observable<Drawing> {
    // console.log('Is Admin? ', this.isAdmin);
    return this.isAdmin
      ? this.getDrawingDetailsAdmin(id)
      : this.getDrawingDetailsPublic(id);
  }

  private getDrawingDetailsPublic(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }
  private getDrawingDetailsAdmin(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details-admin/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  // getAllDrawings(): Observable<Drawing[]> {
  //   return this.http.get<Drawing[]>(`${this.apiUrl}art/drawings`).pipe(
  //     map((drawings: Drawing[]) =>
  //       drawings.map(drawing => new Drawing(drawing))
  //     ),
  //     catchError(this.handleError<Drawing[]>('getAllDrawings'))
  //   );
  // }

  getDrawingProducts(): Observable<DrawingProduct[]> {
    return this.http
      .get<DrawingProduct[]>(`${this.apiUrl}art/select/products`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  getDrawingCharacters(): Observable<DrawingCharacter[]> {
    return this.http
      .get<DrawingCharacter[]>(`${this.apiUrl}art/select/characters`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  getDrawingModels(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}art/select/models`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  cheerDrawing(id: string): Observable<unknown> {
    const url = `${this.apiUrl}art/cheer`;

    return this.http
      .post<void>(url, JSON.stringify(id), { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  voteDrawing(id: string, score: number): Observable<IVoteDrawingResponse> {
    const url = `${this.apiUrl}art/vote/${id}`;

    return this.http
      .post<IVoteDrawingResponse>(url, JSON.stringify(score), {
        headers: this.postHeaders,
      })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  checkAzurePath(path: string): Observable<ICheckAzurePathResponse> {
    const url = `${this.apiUrl}art/checkazurepath`;

    const body: ICheckAzurePathRequest = {
      id: path,
    };
    return this.http
      .post<ICheckAzurePathResponse>(url, body, { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  removeCollection(id: string): Observable<void> {
    const url = `${this.apiUrl}art/collection/remove`;

    return this.http
      .post<void>(url, JSON.stringify(id), { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  saveDrawing(drawing: ISaveDrawingRequest): Observable<Drawing> {
    const url = `${this.apiUrl}art/save/${drawing.id}`;

    return this.http
      .post<Drawing>(url, drawing, { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  saveCollection(collection: ISaveCollectionRequest): Observable<Collection> {
    const url = `${this.apiUrl}art/save/collection/${collection.id}`;

    return this.http
      .post<Collection>(url, collection, { headers: this.postHeaders })
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  uploadAzureImage(form: FormData): Observable<UploadAzureImageResponse> {
    const url = `${this.apiUrl}art/upload`;
    return this.http
      .post<UploadAzureImageResponse>(url, form)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  checkDrawingId(id: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}art/checkdrawing/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  checkCollectionId(id: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}art/check/collection/${id}`)
      .pipe(timeout(this.timeoutMs), catchError(this.handleRequestError));
  }

  filterDrawings(filters: DrawingFilter): Observable<FilterResultsDrawing> {
    return this.isAdmin
      ? this.filterDrawingsAdmin(filters)
      : this.filterDrawingsPublic(filters);
  }

  private filterDrawingsPublic(
    filters: DrawingFilter
  ): Observable<FilterResultsDrawing> {
    const url = `${this.apiUrl}art/filter-public`;
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
    const url = `${this.apiUrl}art/filter-admin`;
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

  getAllCollections(): Observable<Collection[]> {
    return this.isAdmin
      ? this.getAllCollectionsAdmin()
      : this.getAllCollectionsPublic();
  }

  getAllCollectionsPublic(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${this.apiUrl}art/collections-public`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collections: Collection[]) =>
          collections.map(collection => new Collection(collection))
        )
      );
  }

  getAllCollectionsAdmin(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${this.apiUrl}art/collections-admin`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collections: Collection[]) =>
          collections.map(collection => new Collection(collection))
        )
      );
  }

  getCollectionDetails(id: string): Observable<Collection> {
    return this.isAdmin
      ? this.getCollectionDetailsAdmin(id)
      : this.getCollectionDetailsPublic(id);
  }

  getCollectionDetailsPublic(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}art/collection/details-public/${id}`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collection: Collection) => new Collection(collection))
      );
  }

  getCollectionDetailsAdmin(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}art/collection/details-admin/${id}`)
      .pipe(
        timeout(this.timeoutMs),
        catchError(this.handleRequestError),
        map((collection: Collection) => new Collection(collection))
      );
  }

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
