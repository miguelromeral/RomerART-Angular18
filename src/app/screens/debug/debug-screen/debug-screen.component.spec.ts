import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugScreenComponent } from './debug-screen.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@app/services/language/language.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '@app/services/api/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '@models/auth/user.model';
import { ActivatedRoute } from '@angular/router';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

describe('DebugScreenComponent', () => {
  let component: DebugScreenComponent;
  let fixture: ComponentFixture<DebugScreenComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      {
        queryParams: of({ uno: 'one' }),
      }
    );

    await TestBed.configureTestingModule({
      imports: [DebugScreenComponent, TranslateModule.forRoot(), CustomTranslatePipe],
      providers: [
        {
          provide: TranslateService,
          useValue: {},
        },
        {
          provide: LanguageService,
          useValue: {},
        },

        { provide: AuthService, useValue: spyAuth },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(DebugScreenComponent);
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
