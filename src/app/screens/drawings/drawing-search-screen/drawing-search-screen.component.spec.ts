import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSearchScreenComponent } from '@app/screens/drawings/art-search-screen/art-search-screen.component';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '@models/auth/user.model';
import { AuthService } from '@app/services/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { DrawingProduct } from '@models/art/drawing-product.model';
import { DrawingCharacter } from '@models/art/drawing-character.model';

describe('DrawingSearchScreenComponent', () => {
  let component: DrawingSearchScreenComponent;
  let fixture: ComponentFixture<DrawingSearchScreenComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'getDrawingStyles',
      'getDrawingProductTypes',
      'getDrawingSoftwares',
      'getDrawingPaperSizes',
      'getDrawingProducts',
      'getDrawingCharacters',
      'getDrawingModels',
    ]);

    const routerSpy = jasmine.createSpyObj(
      'Router',
      [
        'navigate',
        'events',
        'createUrlTree',
        'serializeUrl',
        'parseUrl',
        'isActive',
      ],
      {
        url: '/home', // Simulando que la URL actual es /home
        events: of(new RouterEvent(1, '/home')), // Simulando evento de cambio de ruta
      }
    );
    const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      {
        queryParams: of({ uno: 'one' }),
      }
    );

    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [
        DrawingSearchScreenComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: spyHttp },
        { provide: AuthService, useValue: spyAuth },
        { provide: DrawingService, useValue: spyDrawing },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    const mockCollections: Collection[] = [
      {
        id: '',
        description: '',
        drawings: [],
        drawingsId: [],
        label: '',
        labelCode: '',
        name: '',
        order: 1,
        textDrawingsReferences: '',
        value: '',
      },
    ];
    drawingServiceSpy.getAllCollections.and.returnValue(of(mockCollections));
    const mockProducts: DrawingProduct[] = [
      {
        label: 'label',
        labelCode: 'CODE',
        productName: 'Product',
        productType: 'Type',
        productTypeId: 1,
        value: 'value',
      },
    ];
    drawingServiceSpy.getDrawingProducts.and.returnValue(of(mockProducts));
    const mockDrawings: DrawingCharacter[] = [
      {
        characterName: 'Character',
        label: 'label',
        labelCode: 'CODE',
        productType: 'Product',
        productTypeId: 1,
        value: 'value',
      },
    ];
    drawingServiceSpy.getDrawingCharacters.and.returnValue(of(mockDrawings));
    const mockModels: string[] = ['model1', 'model2'];
    drawingServiceSpy.getDrawingModels.and.returnValue(of(mockModels));

    fixture = TestBed.createComponent(DrawingSearchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Para simular un usuario logueado (admin o no)
    loggedUserSubject.next({
      id: '1',
      role: 'user',
      token: '',
      username: '',
    } as User); // Cambiar 'user' por 'admin' para el caso de admin
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
