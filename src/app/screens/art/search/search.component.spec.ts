import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '@models/auth/user.model';
import { AuthService } from '@app/services/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
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
        SearchComponent,
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

    fixture = TestBed.createComponent(SearchComponent);
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
