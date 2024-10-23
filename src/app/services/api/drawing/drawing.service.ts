import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
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

  public postHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.loggedUser$.subscribe(user => {
      this.user = user;
      this.authService.isAdminUser(user).subscribe(admin => {
        this.isAdmin = admin;
      });
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
    return this.isAdmin
      ? this.getDrawingDetailsAdmin(id)
      : this.getDrawingDetailsPublic(id);
  }

  private getDrawingDetailsPublic(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details/${id}`)
      .pipe(catchError(this.handleError<Drawing>('getArtDetails')));
  }
  private getDrawingDetailsAdmin(id: string): Observable<Drawing> {
    return this.http
      .get<Drawing>(`${this.apiUrl}art/details-admin/${id}`)
      .pipe(catchError(this.handleError<Drawing>('getDrawingDetailsAdmin')));
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

  cheerDrawing(id: string): Observable<unknown> {
    const url = `${this.apiUrl}art/cheer`;

    return this.http
      .post<void>(url, JSON.stringify(id), { headers: this.postHeaders })
      .pipe(catchError(this.handleError<unknown>('cheerDrawing')));
  }

  voteDrawing(id: string, score: number): Observable<IVoteDrawingResponse> {
    const url = `${this.apiUrl}art/vote/${id}`;

    return this.http
      .post<IVoteDrawingResponse>(url, JSON.stringify(score), {
        headers: this.postHeaders,
      })
      .pipe(catchError(this.handleError<IVoteDrawingResponse>('voteDrawing')));
  }

  checkAzurePath(path: string): Observable<ICheckAzurePathResponse> {
    const url = `${this.apiUrl}art/checkazurepath`;

    const body: ICheckAzurePathRequest = {
      id: path,
    };
    return this.http
      .post<ICheckAzurePathResponse>(url, body, { headers: this.postHeaders })
      .pipe(
        catchError(this.handleError<ICheckAzurePathResponse>('checkAzurePath'))
      );
  }

  removeCollection(id: string): Observable<void> {
    const url = `${this.apiUrl}art/collection/remove`;

    return this.http
      .post<void>(url, JSON.stringify(id), { headers: this.postHeaders })
      .pipe(catchError(this.handleError<void>('removeCollection')));
  }

  saveDrawing(drawing: ISaveDrawingRequest): Observable<Drawing> {
    const url = `${this.apiUrl}art/save/${drawing.id}`;

    return this.http
      .post<Drawing>(url, drawing, { headers: this.postHeaders })
      .pipe(catchError(this.handleError<Drawing>('saveDrawing')));
  }

  saveCollection(collection: ISaveCollectionRequest): Observable<Collection> {
    const url = `${this.apiUrl}art/save/collection/${collection.id}`;

    return this.http
      .post<Collection>(url, collection, { headers: this.postHeaders })
      .pipe(catchError(this.handleError<Collection>('saveCollection')));
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

  checkCollectionId(id: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}art/check/collection/${id}`)
      .pipe(catchError(this.handleError<boolean>('checkCollectionId')));
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

    // console.log('Filters', filters);
    // console.log('Page Number', filters.pageNumber);
    return this.http
      .post<FilterResultsDrawing>(url, filters, { headers: this.postHeaders })
      .pipe(
        map(
          (results: FilterResultsDrawing) => new FilterResultsDrawing(results)
        ),
        catchError(
          this.handleError<FilterResultsDrawing>('filterDrawingsPublic')
        )
      );
  }

  filterDrawingsAdmin(
    filters: DrawingFilter
  ): Observable<FilterResultsDrawing> {
    const url = `${this.apiUrl}art/filter-admin`;

    // console.log('Filters', filters);
    // console.log('Page Number', filters.pageNumber);
    return this.http
      .post<FilterResultsDrawing>(url, filters, { headers: this.postHeaders })
      .pipe(
        map(
          (results: FilterResultsDrawing) => new FilterResultsDrawing(results)
        ),
        catchError(
          this.handleError<FilterResultsDrawing>('filterDrawingsAdmin')
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
        map((collections: Collection[]) =>
          collections.map(collection => new Collection(collection))
        ),
        catchError(this.handleError<Collection[]>('getAllCollections'))
      );
  }

  getAllCollectionsAdmin(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${this.apiUrl}art/collections-admin`)
      .pipe(
        map((collections: Collection[]) =>
          collections.map(collection => new Collection(collection))
        ),
        catchError(this.handleError<Collection[]>('getAllCollections'))
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
        map((collection: Collection) => new Collection(collection)),
        catchError(
          this.handleError<Collection>('getCollectionDetails', {
            id: '',
            description: '',
            drawings: [],
            drawingsId: [],
            label: '',
            labelCode: '',
            name: 'not-found',
            order: 0,
            textDrawingsReferences: '',
            value: '',
          })
        )
      );
  }

  getCollectionDetailsAdmin(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}art/collection/details-admin/${id}`)
      .pipe(
        map((collection: Collection) => new Collection(collection)),
        catchError(this.handleError<Collection>('getCollectionDetails'))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
