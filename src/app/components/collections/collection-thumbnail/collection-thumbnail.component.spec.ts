import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionThumbnailComponent } from './collection-thumbnail.component';
import { AuthService } from '@app/services/api/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '@models/auth/user.model';

describe('CollectionThumbnailComponent', () => {
  let component: CollectionThumbnailComponent;
  let fixture: ComponentFixture<CollectionThumbnailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    // Crear un BehaviorSubject simulado para loggedUser$
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [CollectionThumbnailComponent],
      providers: [{ provide: AuthService, useValue: spyAuth }],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.isAdmin.and.returnValue(of(false));

    fixture = TestBed.createComponent(CollectionThumbnailComponent);
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
