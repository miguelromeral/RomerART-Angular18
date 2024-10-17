import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { AuthService } from '@app/services/api/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { loggedUserLocalStorageKey } from 'config/auth/auth.config';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models/auth/user.model';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();

    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
    ]);

    await TestBed.configureTestingModule({
      imports: [ImageComponent, TranslateModule.forRoot()],
      providers: [
        { provide: DrawingService, useValue: spyDrawing },
        { provide: AuthService, useValue: spyAuth },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
