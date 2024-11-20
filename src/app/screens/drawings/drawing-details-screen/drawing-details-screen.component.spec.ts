import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingDetailsScreenComponent } from '@app/screens/drawings/art-details-screen/art-details-screen.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '@models/auth/user.model';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';

describe('DrawingDetailsScreenComponent', () => {
  let component: DrawingDetailsScreenComponent;
  let fixture: ComponentFixture<DrawingDetailsScreenComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
    ]);
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [DrawingDetailsScreenComponent, TranslateModule.forRoot()],
      providers: [
        { provide: DrawingService, useValue: spyDrawing },
        { provide: AuthService, useValue: spyAuth },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;
    authServiceSpy.isAdmin.and.returnValue(of(false));

    fixture = TestBed.createComponent(DrawingDetailsScreenComponent);
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
