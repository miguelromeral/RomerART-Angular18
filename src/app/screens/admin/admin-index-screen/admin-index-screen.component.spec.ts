import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndexScreenComponent } from './admin-index-screen.component';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models/auth/user.model';
import { AuthService } from '@app/services/api/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

describe('AdminIndexScreenComponent', () => {
  let component: AdminIndexScreenComponent;
  let fixture: ComponentFixture<AdminIndexScreenComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [AdminIndexScreenComponent, TranslateModule.forRoot()],
      providers: [{ provide: AuthService, useValue: spyAuth }],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(AdminIndexScreenComponent);
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
