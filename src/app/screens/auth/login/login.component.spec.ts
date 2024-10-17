import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';
import { User } from '@models/auth/user.model';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [LoginComponent, TranslateModule.forRoot()],
      providers: [{ provide: AuthService, useValue: spyAuth }],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LoginComponent);
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
