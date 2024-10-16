import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} }, // Si necesitas agregar algo para ActivatedRoute
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Si tienes componentes standalone como NavbarLinkComponent
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentRoute with router URL', () => {
    // El componente debería inicializar currentRoute con la URL del router
    expect(component.currentRoute).toBe('/home');
  });

  // TODO: terminar el caso de cuando cambia la URL
  // it('should update currentRoute when router events change', () => {
  //   // Simulamos un cambio de ruta
  //   router.events = of(new RouterEvent(1, '/about')); // Simula evento de navegación a /about
  //   component.ngOnInit(); // Reejecutamos ngOnInit para forzar la suscripción
  //   expect(component.currentRoute).toBe('/about'); // Verificamos que se actualizó la ruta
  // });
});
