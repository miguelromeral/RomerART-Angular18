import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScreenComponent } from './login-screen.component';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';
import { User } from '@models/auth/user.model';
import { TranslateModule } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, RouterEvent } from '@angular/router';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', [
      'isAdmin',
      'login',
      'saveLoggedUser',
      'getRedirectUrl',
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
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [LoginScreenComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: spyAuth },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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

  it('should login correctly', () => {
    const mockUser: User = {
      role: 'admin',
      token: 'token',
      username: 'username',
    };
    const mockPassword = 'password';
    authServiceSpy.login.and.returnValue(of(mockUser));
    const mockRedirectUrl = '/profile';
    authServiceSpy.getRedirectUrl.and.returnValue(mockRedirectUrl);

    const componentDe: DebugElement = fixture.debugElement;
    const inputUsernameDe: DebugElement = componentDe.query(
      By.css('#iUsername')
    );
    const inputUsername: HTMLInputElement = inputUsernameDe.nativeElement;
    const inputPasswordDe: DebugElement = componentDe.query(
      By.css('#iPassword')
    );
    const inputPassword: HTMLInputElement = inputPasswordDe.nativeElement;
    const formDe: DebugElement = componentDe.query(By.css('#formLogin')); // El formulario entero

    inputUsername.value = mockUser.username;
    inputUsername.dispatchEvent(new Event('input'));
    inputPassword.value = mockPassword;
    inputPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    formDe.triggerEventHandler('submit', null);

    fixture.detectChanges();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      username: mockUser.username,
      password: mockPassword,
    });
    expect(router.navigate).toHaveBeenCalledWith([mockRedirectUrl]);
    expect(authServiceSpy.saveLoggedUser).toHaveBeenCalledTimes(1);
  });

  it('should prevent login if not input provided', () => {
    const componentDe: DebugElement = fixture.debugElement;
    const formDe: DebugElement = componentDe.query(By.css('#formLogin')); // El formulario entero

    formDe.triggerEventHandler('submit', null);

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
