import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { AuthService } from '@app/services/api/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { loggedUserLocalStorageKey } from 'config/auth/auth.config';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '@models/auth/user.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, RouterEvent } from '@angular/router';
import { SettingsService } from '@app/services/settings/settings.service';
import { Drawing } from '@models/art/drawing.model';
import { HeartUtils } from '@utils/customization/heart-utils';
import { heartsAnimationConfig } from 'config/customization/heart-animation.config';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let settingSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    const spyAuth = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const loggedUserSubject = new BehaviorSubject<User | null>(null);
    spyAuth.loggedUser$ = loggedUserSubject.asObservable();
    const spySetting = jasmine.createSpy('SettingsService');

    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'cheerDrawing',
    ]);
    const spyRouter = jasmine.createSpyObj(
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

    await TestBed.configureTestingModule({
      imports: [ImageComponent, TranslateModule.forRoot()],
      providers: [
        { provide: DrawingService, useValue: spyDrawing },
        { provide: AuthService, useValue: spyAuth },
        { provide: Router, useValue: spyRouter },
        // { provide: SettingsService, useValue: spySetting },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    authServiceSpy.isAdmin.and.returnValue(of(false));

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    // settingSpy = TestBed.inject(
    //   SettingsService
    // ) as jasmine.SpyObj<SettingsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show image in full screen', () => {
    component.drawing = {
      id: 'jasmine-test',
      instagramUrl: '',
      twitterUrl: '',
      likes: 0,
      likesHuman: '',
      modelName: '',
      name: '',
      path: '',
      pathThumbnail: '',
      scoreCritic: 0,
      scorePopular: 0,
    } as Drawing;

    fixture.detectChanges();

    const componentDe = fixture.debugElement;
    const divImageDe = componentDe.query(By.css('#divImgFull'));
    const divImage = divImageDe.nativeElement;

    expect(component.isFullScreen)
      .withContext('by default not enabled fullscreen')
      .toBeFalsy();
    expect(divImage.classList).not.toContain('fullscreen');

    component.fullScreenImage();
    fixture.detectChanges();

    expect(component.isFullScreen)
      .withContext('enabled fullscreen on triggered')
      .toBeTruthy();
    expect(divImage.classList).toContain('fullscreen');

    component.fullScreenImage();
    fixture.detectChanges();

    expect(component.isFullScreen)
      .withContext('fullscreen disabled on clicked again')
      .toBeFalsy();
    expect(divImage.classList).not.toContain('fullscreen');
  });

  it('should print human format', () => {
    expect(component.formatoLegible(1)).toBe('1');
    expect(component.formatoLegible(1000)).toBe('1k');
    expect(component.formatoLegible(1510)).toBe('1.5k');
    expect(component.formatoLegible(1000000)).toBe('1M');
    expect(component.formatoLegible(1500400)).toBe('1.5M');
  });

  it('should flip drawing', () => {
    component.drawing = {
      id: 'jasmine-test',
      url: '',
    } as Drawing;
    const flippedClass = 'flipped';
    component.loading = false;

    fixture.detectChanges();

    const componentDe = fixture.debugElement;
    const imageDe = componentDe.query(By.css('#divImgFull img'));
    const image = imageDe.nativeElement;

    expect(image.classList).not.toContain(flippedClass);

    component.flipDrawing();
    fixture.detectChanges();
    expect(image.classList).toContain(flippedClass);

    component.flipDrawing();
    fixture.detectChanges();
    expect(image.classList).not.toContain(flippedClass);
  });

  it('should navigate to edit drawing', () => {
    component.drawing = {
      id: 'jasmine-test',
    } as Drawing;
    fixture.detectChanges();

    component.editDrawing();

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      `/art/edit/${component.drawing.id}`,
    ]);
  });

  it('should cheer drawing', fakeAsync(() => {
    const initialLikes = 0;
    component.drawing = {
      id: 'jasmine-test',
      likes: initialLikes,
    } as Drawing;
    component.loading = false;
    fixture.detectChanges();
    spyOn(component.submittedCheer, 'emit');
    spyOn(HeartUtils, 'showHearts');

    drawingServiceSpy.cheerDrawing.and.returnValue(of(true));

    const componentDe = fixture.debugElement;
    const cheerButtonDe = componentDe.query(By.css(`#${component.btnCheerId}`));

    // const heartRainDe = componentDe.query(By.css('.heart-rain'));
    // console.log('--> Heart Rain', heartRainDe);

    // Simular un evento click con coordenadas
    const mockMouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100, // Coordenada X simulada
      clientY: 200, // Coordenada Y simulada
    });

    // Disparar el evento y detectar cambios
    cheerButtonDe.triggerEventHandler('click', mockMouseEvent);
    fixture.detectChanges();

    // Simular el paso del tiempo para el setTimeout
    tick(heartsAnimationConfig.duration.max * 1000);

    // Verificar que el elemento fue eliminado
    const element = document.querySelector('.mr-thanks-message');
    expect(element).toBeNull(); // El elemento debería haber sido eliminado

    expect(component.submittedCheer.emit).toHaveBeenCalledTimes(1);
    expect(component.submittedCheer.emit).toHaveBeenCalledWith(
      initialLikes + 1
    );

    const customError = new Error('Cheer drawing failed');
    drawingServiceSpy.cheerDrawing.and.returnValue(throwError(customError));

    cheerButtonDe.triggerEventHandler('click', mockMouseEvent);
    fixture.detectChanges();
    tick(heartsAnimationConfig.duration.max * 1000);

    expect(component.submittedCheer.emit)
      .withContext('despite being cheered, no changes in count')
      .toHaveBeenCalledTimes(1);
  }));
});
