import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollectionComponent } from './search-collection.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { User } from '@models/auth/user.model';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '@models/art/collection.model';

describe('SearchCollectionComponent', () => {
  let component: SearchCollectionComponent;
  let fixture: ComponentFixture<SearchCollectionComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      {
        queryParams: of({ uno: 'one' }),
      }
    );

    await TestBed.configureTestingModule({
      imports: [SearchCollectionComponent, TranslateModule.forRoot()],
      providers: [
        { provide: DrawingService, useValue: spyDrawing },
        { provide: AuthService, useValue: spyAuth },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
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

    fixture = TestBed.createComponent(SearchCollectionComponent);
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
