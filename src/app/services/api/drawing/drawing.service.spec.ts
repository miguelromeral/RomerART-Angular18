import { TestBed } from '@angular/core/testing';
import { DrawingService } from './drawing.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
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

describe('DrawingService', () => {
  let service: DrawingService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spyHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);

    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    TestBed.configureTestingModule({
      providers: [
        DrawingService,
        { provide: HttpClient, useValue: spyHttp },
        { provide: AuthService, useValue: spyAuth },
      ],
    });

    service = TestBed.inject(DrawingService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

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

  it('should return false if not user is found', () => {
    service.user = null;
    expect(service.adminAccess()).toBeFalsy();
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
    authServiceSpy.isAdmin.and.returnValue(true);

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

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${service['apiUrl']}art/cheer`
    );
  });
});
