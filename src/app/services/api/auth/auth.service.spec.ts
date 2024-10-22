import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage/local-storage.service';
import { of, throwError } from 'rxjs';
import { User } from '@models/auth/user.model';
import { environment } from 'environments/environment';
import {
  localStorageKey,
  loggedUserLocalStorageKey,
} from 'config/auth/auth.config';
import { jwtDecode } from 'jwt-decode';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    environment.api.url = 'https://mocked-url.com/api/';

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should log in the user successfully', () => {
      const mockUser: User = {
        role: 'admin',
        token: 'mock-token',
        username: 'admin',
      };
      httpClientSpy.post.and.returnValue(of(mockUser));

      service
        .login({ username: 'admin', password: 'admin' })
        .subscribe(user => {
          expect(user).toEqual(mockUser);
        });

      expect(httpClientSpy.post).toHaveBeenCalledWith(
        `${service['apiUrl']}auth/login`,
        { username: 'admin', password: 'admin' }
      );
    });

    it('should handle login errors', () => {
      const errorResponse = new Error('Login failed');
      httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

      service.login({ username: 'admin', password: 'wrong' }).subscribe({
        next: () => fail('expected an error'),
        error: error => expect(error).toEqual(errorResponse),
      });
    });
  });

  describe('isTokenExpired', () => {
    it('should return true if token is expired', () => {
      const expiredToken = 'mock-expired-token';
      spyOn(service, 'getToken').and.returnValue(expiredToken);
      spyOn(window, 'Date').and.returnValue({ getTime: () => 1000 } as any);

      const result = service.isTokenExpired(expiredToken);
      expect(result).toBeTrue();
    });

    it('should return false if token is not expired', () => {
      // Un token simulado con una fecha de expiración futura (exp en segundos)
      const validToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjE2MDAwMDAwMDB9.' +
        'dummySignature'; // Expira en el futuro (por ejemplo 2033)

      // Espiar Date.now() para devolver un valor en el "presente"
      spyOn(Date, 'now').and.returnValue(1000 * 999_999_999); // Un tiempo anterior al exp

      const result = service.isTokenExpired(validToken);

      expect(result).toBeFalse();
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorageSpy.getItem.and.returnValue('mock-token');
      const token = service.getToken();
      expect(token).toBe('mock-token');
      expect(localStorageSpy.getItem).toHaveBeenCalledWith(localStorageKey);
    });
  });

  describe('logout', () => {
    it('should clear token and navigate to login', () => {
      service.logout();
      expect(localStorageSpy.removeItem).toHaveBeenCalledWith(localStorageKey);
      expect(localStorageSpy.removeItem).toHaveBeenCalledWith(
        loggedUserLocalStorageKey
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
      expect(service['loggedUserSubject'].getValue()).toBeNull();
    });
  });

  describe('saveLoggedUser', () => {
    it('should save user in localStorage and update loggedUserSubject', () => {
      const mockUser: User = {
        role: 'admin',
        token: 'mock-token',
        username: 'admin',
      };

      service.saveLoggedUser(mockUser);

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        loggedUserLocalStorageKey,
        JSON.stringify(mockUser)
      );
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        localStorageKey,
        mockUser.token
      );
      expect(service['loggedUserSubject'].getValue()).toEqual(mockUser);
    });
  });

  describe('isAdminUser', () => {
    it('should return true if user is admin', () => {
      const adminUser: User = {
        role: 'admin',
        token: 'token',
        username: 'admin',
      };
      httpClientSpy.post.and.returnValue(of(true));
      service.isAdminUser(adminUser).subscribe(isAdmin => {
        expect(isAdmin).toBeTrue();
      });
    });

    it('should return false if user is not admin', () => {
      const nonAdminUser: User = {
        role: 'user',
        token: 'token',
        username: 'user',
      };
      httpClientSpy.post.and.returnValue(of(false));
      service.isAdminUser(nonAdminUser).subscribe(isAdmin => {
        expect(isAdmin).toBeFalse();
      });
    });

    it('should return false if not user provided', () => {
      service.isAdminUser(null).subscribe(isAdmin => {
        expect(isAdmin).toBeFalse();
      });
    });
  });

  describe('getRedirectUrl', () => {
    it('should return the correct redirect URL after login', () => {
      const redirectUrl = service.getRedirectUrl();
      expect(redirectUrl).toBe(service.redirectUrlAfterLogin);
    });
  });

  describe('uptadeRedirectUrl', () => {
    it('should update the redirect URL', () => {
      const newUrl = '/new-url';
      service.uptadeRedirectUrl(newUrl);
      expect(service.redirectUrlAfterLogin).toBe(newUrl);
    });
  });

  describe('validateToken', () => {
    it('should call the validate token API', done => {
      const mockToken = 'token';
      httpClientSpy.post.and.returnValue(of(true));

      service.validateToken(mockToken).subscribe(() => {
        done();
      });

      expect(httpClientSpy.post).toHaveBeenCalledWith(
        `${service['apiUrl']}auth/validate-token`,
        { token: mockToken }
      );
    });
  });

  describe('getInfo', () => {
    it('should call the API', done => {
      httpClientSpy.get.and.returnValue(of(true));

      service.getInfo().subscribe(() => {
        done();
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['apiUrl']}account/info`
      );
    });
  });
  describe('loggedIn', () => {
    it('should check if logged in', () => {
      localStorageSpy.getItem.and.returnValue(null);
      expect(service.loggedIn).toBeFalse();

      localStorageSpy.getItem.and.returnValue('user');
      expect(service.loggedIn).toBeTrue();
    });
  });

  describe('init', () => {
    it('should not do anything if there is no logged user in localStorage', () => {
      // Simular que no hay ningún usuario logueado en el localStorage
      localStorageSpy.getItem.and.returnValue(null);

      // Ejecutar la función init
      service.init();

      // Verificar que no se guarda ningún usuario y no se llama a logout
      expect(localStorageSpy.getItem).toHaveBeenCalledWith(
        loggedUserLocalStorageKey
      );
      expect(localStorageSpy.getItem).toHaveBeenCalledWith(localStorageKey);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should save the logged user if found in localStorage', () => {
      const mockUser = {
        role: 'role',
        username: 'testuser',
        token: 'valid-token',
      } as User;

      // Simular que hay un usuario logueado en el localStorage
      localStorageSpy.getItem.and.callFake((key: string) => {
        if (key === loggedUserLocalStorageKey) {
          return JSON.stringify(mockUser);
        }
        return null;
      });

      spyOn(service, 'saveLoggedUser');

      service.init();

      expect(localStorageSpy.getItem).toHaveBeenCalledWith(
        loggedUserLocalStorageKey
      );
      expect(service.saveLoggedUser).toHaveBeenCalledWith(mockUser);
    });

    it('should log out if the token is expired', () => {
      const mockUser = {
        role: 'role',
        username: 'testuser',
        token: 'expired-token',
      } as User;

      // Simular que hay un usuario logueado en el localStorage
      localStorageSpy.getItem.and.callFake((key: string) => {
        if (key === loggedUserLocalStorageKey) {
          return JSON.stringify(mockUser);
        }
        if (key === localStorageKey) {
          return 'expired-token';
        }
        return null;
      });

      spyOn(service, 'isTokenExpired').and.returnValue(true); // Simular que el token ha expirado
      spyOn(service, 'logout');

      service.init();

      expect(service.isTokenExpired).toHaveBeenCalledWith('expired-token');
      expect(service.logout).toHaveBeenCalled();
    });

    it('should not log out if the token is not expired', () => {
      const mockUser = {
        role: 'role',
        username: 'testuser',
        token: 'valid-token',
      } as User;

      // Simular que hay un usuario logueado en el localStorage
      localStorageSpy.getItem.and.callFake((key: string) => {
        if (key === loggedUserLocalStorageKey) {
          return JSON.stringify(mockUser);
        }
        if (key === localStorageKey) {
          return 'valid-token';
        }
        return null;
      });

      spyOn(service, 'isTokenExpired').and.returnValue(false); // Simular que el token no ha expirado
      spyOn(service, 'logout');

      service.init();

      expect(service.isTokenExpired).toHaveBeenCalledWith('valid-token');
      expect(service.logout).not.toHaveBeenCalled();
    });
  });
});
