import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '@models/auth/user.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
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
      imports: [DetailsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: DrawingService, useValue: spyDrawing },
        { provide: AuthService, useValue: spyAuth },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(DetailsComponent);
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
