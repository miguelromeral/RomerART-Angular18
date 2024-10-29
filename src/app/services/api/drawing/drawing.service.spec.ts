import { TestBed } from '@angular/core/testing';
import { DrawingService } from './drawing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Drawing } from '../../../../models/art/drawing.model';
import { AuthService } from '../auth/auth.service';
import { User } from '@models/auth/user.model';
import { drawingStyles } from 'config/data/drawing-styles.config';
import { DrawingStyle } from '@models/art/drawing-style.model';
import { drawingProductTypes } from 'config/data/drawing-product-types.config';
import { DrawingProductType } from '@models/art/drawing-product-type.model';
import { drawingSoftwares } from 'config/data/drawing-softwares.config';
import { DrawingSoftware } from '@models/art/drawing-software.model';
import { drawingFilterEffects } from 'config/data/drawing-filter-effect.config';
import { DrawingFilterEffect } from '@models/art/drawing-filter-effect.model';
import { drawingPaperSizes } from 'config/data/drawing-paper-sizes.config';
import { DrawingPaperSize } from '@models/art/drawing-paper-size.model';
import { DrawingProduct } from '@models/art/drawing-product.model';
import { DrawingCharacter } from '@models/art/drawing-character.model';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';
import { ICheckAzurePathResponse } from '@models/responses/check-azure-path-response.model';
import { ICheckAzurePathRequest } from '@models/requests/check-azure-path-request.model';
import { environment } from 'environments/environment';
import { ISaveDrawingRequest } from '@models/requests/save-drawing-request.model';
import { Collection } from '@models/art/collection.model';
import { ISaveCollectionRequest } from '@models/requests/save-collection-request.model';
import { UploadAzureImageRequest } from '@models/requests/upload-azure-image-request.model';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { DrawingFilter } from '@models/art/drawing-filter.model';

describe('DrawingService', () => {
  let service: DrawingService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const loggedUserSubject = new BehaviorSubject<User | null>(null);

  beforeEach(() => {
    environment.api.url = 'https://mocked-url.com/api/';

    const spyHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    const spyAuth = jasmine.createSpyObj('AuthService', [
      'isAdmin',
      'isAdminUser',
      'validateToken',
    ]);

    // Crear un BehaviorSubject simulado para loggedUser$
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    TestBed.configureTestingModule({
      providers: [
        DrawingService,
        { provide: HttpClient, useValue: spyHttp },
        { provide: AuthService, useValue: spyAuth },
      ],
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.isAdmin.and.returnValue(of(false));
    authServiceSpy.isAdminUser.and.returnValue(of(false));

    service = TestBed.inject(DrawingService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    // Para simular un usuario logueado (admin o no)
    loggedUserSubject.next({
      id: '1',
      role: 'user',
      token: '',
      username: '',
    } as User); // Cambiar 'user' por 'admin' para el caso de admin
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all drawing styles', () => {
    const expected = drawingStyles
      .map(style => new DrawingStyle(style))
      .map(x => x.id);
    const result = service.getDrawingStyles().map(x => x.id);
    expect(result).toEqual(expected);
  });

  it('should return all drawing product types', () => {
    const expected = drawingProductTypes
      .map(style => new DrawingProductType(style))
      .map(x => x.id);
    const result = service.getDrawingProductTypes().map(x => x.id);
    expect(result).toEqual(expected);
  });

  it('should return all drawing software', () => {
    const expected = drawingSoftwares
      .map(style => new DrawingSoftware(style))
      .map(x => x.id);
    const result = service.getDrawingSoftwares().map(x => x.id);
    expect(result).toEqual(expected);
  });

  it('should return all drawing filter effects', () => {
    const expected = drawingFilterEffects
      .map(style => new DrawingFilterEffect(style))
      .map(x => x.id);
    const result = service.getDrawingFilterEffects().map(x => x.id);
    expect(result).toEqual(expected);
  });

  it('should return all drawing paper sizes', () => {
    const expected = drawingPaperSizes
      .map(style => new DrawingPaperSize(style))
      .map(x => x.id);
    const result = service.getDrawingPaperSizes().map(x => x.id);
    expect(result).toEqual(expected);
  });

  it('should return drawing details for public access', (done: DoneFn) => {
    const mockDrawing: Drawing = {
      id: '123',
      title: 'Sample Drawing',
    } as Drawing;
    httpClientSpy.get.and.returnValue(of(mockDrawing));

    service.getDrawingDetails('123').subscribe(drawing => {
      expect(drawing).toEqual(mockDrawing);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/details/123`
    );
  });

  it('should handle error in getDrawingDetailsPublic', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(null));

    service.getDrawingDetails('invalid-id').subscribe(drawing => {
      expect(drawing).toBeNull();
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/details/invalid-id`
    );
  });

  it('should return drawing details for admin access', (done: DoneFn) => {
    const mockDrawing: Drawing = {
      id: 'admin123',
      title: 'Admin Drawing',
    } as Drawing;
    httpClientSpy.get.and.returnValue(of(mockDrawing));
    authServiceSpy.isAdmin.and.returnValue(of(true));
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    service.getDrawingDetails('admin123').subscribe(drawing => {
      expect(drawing).toEqual(mockDrawing);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/details-admin/admin123`
    );
  });

  it('should return drawing products', (done: DoneFn) => {
    const mockProducts: DrawingProduct[] = [
      {
        label: '',
        labelCode: '',
        productName: '',
        productType: '',
        productTypeId: 1,
        value: '',
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockProducts));

    service.getDrawingProducts().subscribe(result => {
      expect(result).toEqual(mockProducts);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/select/products`
    );
  });

  it('should return drawing characters', (done: DoneFn) => {
    const mock: DrawingCharacter[] = [
      {
        characterName: '',
        label: '',
        labelCode: '',
        productType: '',
        productTypeId: 1,
        value: '',
      },
    ];
    httpClientSpy.get.and.returnValue(of(mock));

    service.getDrawingCharacters().subscribe(result => {
      expect(result).toEqual(mock);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/select/characters`
    );
  });

  it('should return drawing models', (done: DoneFn) => {
    const mock: string[] = ['', ''];
    httpClientSpy.get.and.returnValue(of(mock));

    service.getDrawingModels().subscribe(result => {
      expect(result).toEqual(mock);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/select/models`
    );
  });

  it('should cheer drawing', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(null));

    service.cheerDrawing('id').subscribe(() => {
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/cheer`,
      JSON.stringify('id'),
      { headers: service.postHeaders }
    );
  });

  it('should vote drawing', (done: DoneFn) => {
    const id = 'id';
    const score = 100;
    const mockResponse: IVoteDrawingResponse = {
      newScore: score,
      newScoreHuman: score,
      newVotes: 1,
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.voteDrawing(id, score).subscribe(response => {
      expect(response.newScore).toBe(score);
      expect(response.newScoreHuman).toBe(score);
      expect(response.newVotes).toBe(1);
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/vote/${id}`,
      JSON.stringify(score),
      { headers: service.postHeaders }
    );
  });

  it('should check azure path', done => {
    const path = 'path';
    const mockResponse: ICheckAzurePathResponse = {
      existe: false,
      pathThumbnail: '',
      url: '',
      urlThumbnail: '',
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.checkAzurePath(path).subscribe(() => {
      done();
    });

    const body: ICheckAzurePathRequest = {
      id: path,
    };

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/checkazurepath`,
      body,
      { headers: service.postHeaders }
    );
  });

  it('should remove collection', done => {
    const id = 'id';
    httpClientSpy.post.and.returnValue(of(null));

    service.removeCollection(id).subscribe(() => {
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/collection/remove`,
      JSON.stringify(id),
      { headers: service.postHeaders }
    );
  });

  it('should save drawing', done => {
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);
    const request: ISaveDrawingRequest = {
      id: 'id',
      dateHyphen: '',
      favorite: false,
      filter: 0,
      instagramUrl: '',
      isEditing: false,
      listCommentsCons: [],
      listCommentsPros: [],
      listComments: [],
      listCommentsStyle: [],
      modelName: '',
      name: '',
      paper: 0,
      path: '',
      pathThumbnail: '',
      productName: '',
      productType: 0,
      referenceUrl: '',
      scoreCritic: 0,
      software: 0,
      spotifyUrl: '',
      tagsText: '',
      time: 0,
      title: '',
      twitterUrl: '',
      type: 0,
      visible: false,
    };
    const mockResponse: Drawing = {
      id: 'id',
      dateHyphen: '',
      favorite: false,
      filter: 0,
      instagramUrl: '',
      listCommentsCons: [],
      listCommentsPros: [],
      listComments: [],
      listCommentsStyle: [],
      modelName: '',
      name: '',
      paper: 0,
      path: '',
      pathThumbnail: '',
      productName: '',
      productType: 0,
      referenceUrl: '',
      scoreCritic: 0,
      software: 0,
      spotifyUrl: '',
      tagsText: '',
      time: 0,
      title: '',
      twitterUrl: '',
      type: 0,
      visible: false,
      comment: '',
      commentCons: '',
      commentPros: '',
      date: '',
      dateObject: new Date(),
      filterName: '',
      formattedDate: '',
      formattedDateMini: '',
      isTraditional: false,
      likes: 0,
      likesHuman: '',
      paperHuman: '',
      pageTitle: () => '',
      popularity: 0,
      productTypeName: '',
      scorePopular: 0,
      scorePopularHuman: 0,
      softwareName: '',
      spotifyTrackId: '',
      tags: [],
      timeHuman: '',
      typeName: '',
      url: '',
      urlBase: '',
      urlThumbnail: '',
      views: 0,
      viewsHuman: '',
      votesPopular: 0,
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.saveDrawing(request).subscribe(() => {
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/save/${request.id}`,
      request,
      { headers: service.postHeaders }
    );
  });

  it('should save collection', done => {
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    const mockCollection: Collection = {
      description: '',
      drawings: [],
      drawingsId: [],
      id: '',
      label: '',
      labelCode: '',
      name: '',
      order: 0,
      textDrawingsReferences: '',
      value: '',
    };
    httpClientSpy.post.and.returnValue(of(mockCollection));

    const request: ISaveCollectionRequest = {
      description: '',
      drawingsIds: [],
      id: '',
      isEditing: false,
      name: '',
      order: 0,
    };
    service.saveCollection(request).subscribe(() => {
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/save/collection/${request.id}`,
      request,
      { headers: service.postHeaders }
    );
  });

  it('should upload image to azure', done => {
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    const formData: FormData = new FormData();
    const mockResponse: UploadAzureImageRequest = {
      image: '',
      path: '',
      size: 0,
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.uploadAzureImage(formData).subscribe(() => {
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/upload`,
      formData
    );
  });

  it('should check drawing ID', done => {
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    const id = 'id';
    httpClientSpy.get.and.returnValue(of(false));

    service.checkDrawingId(id).subscribe(() => {
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/checkdrawing/${id}`
    );
  });

  it('should check collection id', done => {
    const id = 'id';
    httpClientSpy.get.and.returnValue(of(false));

    service.checkCollectionId(id).subscribe(() => {
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/check/collection/${id}`
    );
  });

  it('should return filtered drawings for public access', (done: DoneFn) => {
    authServiceSpy.isAdmin.and.returnValue(of(false));
    authServiceSpy.isAdminUser.and.returnValue(of(false));

    const mockResponse: FilterResultsDrawing = {
      fetchedCount: 0,
      filteredCollections: [],
      filteredDrawingCharacters: [],
      filteredDrawingModels: [],
      filteredDrawingPapers: [],
      filteredDrawingProducts: [],
      filteredDrawingProductTypes: [],
      filteredDrawings: [],
      filteredDrawingSoftwares: [],
      filteredDrawingStyles: [],
      moreToFetch: false,
      nDrawingCharacters: 0,
      nDrawingCollections: 0,
      nDrawingFavorites: 0,
      nDrawingModels: 0,
      nDrawingPapers: 0,
      nDrawingProducts: 0,
      nDrawingProductTypes: 0,
      nDrawingSoftwares: 0,
      nDrawingTypes: 0,
      totalCount: 0,
      totalDrawings: [],
      totalTime: 0,
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));
    const filters: DrawingFilter = {
      characterName: '',
      collection: '',
      favorites: false,
      modelName: '',
      pageNumber: 1,
      pageSize: 0,
      paper: '0',
      productName: '',
      productType: '0',
      formFavorites: false,
      formSpotify: '',
      software: '0',
      sortBy: '',
      spotify: false,
      textQuery: '',
      type: '',
    };
    service.filterDrawings(filters).subscribe(results => {
      // expect(results).toEqual(mockResponse);
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/filter-public`,
      filters,
      { headers: service.postHeaders }
    );
  });

  it('should return filtered drawings for public access', (done: DoneFn) => {
    authServiceSpy.isAdmin.and.returnValue(of(true));
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    const mockResponse: FilterResultsDrawing = {
      fetchedCount: 0,
      filteredCollections: [],
      filteredDrawingCharacters: [],
      filteredDrawingModels: [],
      filteredDrawingPapers: [],
      filteredDrawingProducts: [],
      filteredDrawingProductTypes: [],
      filteredDrawings: [],
      filteredDrawingSoftwares: [],
      filteredDrawingStyles: [],
      moreToFetch: false,
      nDrawingCharacters: 0,
      nDrawingCollections: 0,
      nDrawingFavorites: 0,
      nDrawingModels: 0,
      nDrawingPapers: 0,
      nDrawingProducts: 0,
      nDrawingProductTypes: 0,
      nDrawingSoftwares: 0,
      nDrawingTypes: 0,
      totalCount: 0,
      totalDrawings: [],
      totalTime: 0,
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));
    const filters: DrawingFilter = {
      characterName: '',
      collection: '',
      favorites: false,
      modelName: '',
      pageNumber: 1,
      pageSize: 0,
      paper: '0',
      productName: '',
      productType: '0',
      formFavorites: false,
      formSpotify: '',
      software: '0',
      sortBy: '',
      spotify: false,
      textQuery: '',
      type: '',
    };
    service.filterDrawings(filters).subscribe(results => {
      // expect(results).toEqual(mockResponse);
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service['apiUrl']}art/filter-admin`,
      filters,
      { headers: service.postHeaders }
    );
  });

  it('should return all drawings of collection', done => {
    authServiceSpy.isAdmin.and.returnValue(of(false));
    authServiceSpy.isAdminUser.and.returnValue(of(false));
    const collectionId = 'id';

    const mockResponse: FilterResultsDrawing = {
      fetchedCount: 0,
      filteredCollections: [],
      filteredDrawingCharacters: [],
      filteredDrawingModels: [],
      filteredDrawingPapers: [],
      filteredDrawingProducts: [],
      filteredDrawingProductTypes: [],
      filteredDrawings: [],
      filteredDrawingSoftwares: [],
      filteredDrawingStyles: [],
      moreToFetch: false,
      nDrawingCharacters: 0,
      nDrawingCollections: 0,
      nDrawingFavorites: 0,
      nDrawingModels: 0,
      nDrawingPapers: 0,
      nDrawingProducts: 0,
      nDrawingProductTypes: 0,
      nDrawingSoftwares: 0,
      nDrawingTypes: 0,
      totalCount: 0,
      totalDrawings: [],
      totalTime: 0,
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.getAllDrawingsOfCollection(collectionId).subscribe(response => {
      expect(response.fetchedCount).toBe(mockResponse.fetchedCount);
      done();
    });
  });

  it('should return all collections for public access', (done: DoneFn) => {
    authServiceSpy.isAdmin.and.returnValue(of(false));
    authServiceSpy.isAdminUser.and.returnValue(of(false));

    const mockResponse: Collection[] = [
      {
        description: '',
        drawings: [],
        drawingsId: [],
        id: '',
        label: '',
        labelCode: '',
        name: '',
        order: 0,
        textDrawingsReferences: '',
        value: '',
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getAllCollections().subscribe(() => {
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/collections-public`
    );
  });

  it('should return all collections for admin access', (done: DoneFn) => {
    authServiceSpy.isAdmin.and.returnValue(of(true));
    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    const mockResponse: Collection[] = [
      {
        description: '',
        drawings: [],
        drawingsId: [],
        id: '',
        label: '',
        labelCode: '',
        name: '',
        order: 0,
        textDrawingsReferences: '',
        value: '',
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getAllCollections().subscribe(results => {
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/collections-admin`
    );
  });

  it('should return collection details for public access', done => {
    const id = 'id';
    authServiceSpy.isAdmin.and.returnValue(of(false));
    authServiceSpy.isAdminUser.and.returnValue(of(false));

    const mockResponse: Collection = {
      description: '',
      drawings: [],
      drawingsId: [],
      id: id,
      label: '',
      labelCode: '',
      name: '',
      order: 0,
      textDrawingsReferences: '',
      value: '',
    };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getCollectionDetails(id).subscribe(() => {
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/collection/details-public/${id}`
    );
  });

  it('should return collection details for admin access', done => {
    const id = 'id';

    authServiceSpy.isAdminUser.and.returnValue(of(true));
    loggedUserSubject.next({
      role: 'admin',
      token: 'token',
      username: 'username',
    } as User);

    const mockResponse: Collection = {
      description: '',
      drawings: [],
      drawingsId: [],
      id: id,
      label: '',
      labelCode: '',
      name: '',
      order: 0,
      textDrawingsReferences: '',
      value: '',
    };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getCollectionDetails(id).subscribe(() => {
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/collection/details-admin/${id}`
    );
  });

  it('should handle error when getCollectionDetailsPublic fails', () => {
    const id = 'id';
    const mockErrorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });

    const expectedResult = {
      name: 'not-found',
    };

    // Simular que la llamada HTTP falla
    httpClientSpy.get.and.returnValue(throwError(mockErrorResponse));

    // Llamada al método y verificación
    service.getCollectionDetailsPublic('id').subscribe(result => {
      expect(result.name).toEqual(expectedResult.name); // Verificar que retorna el valor por defecto en caso de error
    });

    // Verifica que se haya llamado a la URL correcta
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${environment.api.url}art/collection/details-public/${id}`
    );
  });
});
