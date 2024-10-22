import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { settingTheme, settingThemeValues } from 'config/settings/theme.config';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: LocalStorageService, useValue: spy },
      ],
    });

    service = TestBed.inject(ThemeService);
    localStorageSpy = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;

    service.setTheme(settingTheme.defaultValue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should set theme to default if no theme is stored in LocalStorage', () => {
      localStorageSpy.getItem.and.returnValue(null); // Simular que no hay tema guardado
      spyOn(service, 'setTheme').and.callThrough(); // Espiar la llamada a setTheme

      service.init();

      expect(service.setTheme).toHaveBeenCalledWith(settingTheme.defaultValue);
    });

    it('should set theme from LocalStorage if exists', () => {
      const storedTheme = settingThemeValues.dark;
      localStorageSpy.getItem.and.returnValue(storedTheme); // Simular que hay tema guardado

      spyOn(service, 'setTheme').and.callThrough(); // Espiar la llamada a setTheme

      service.init();

      expect(service.setTheme).toHaveBeenCalledWith(storedTheme);
    });
  });

  describe('setTheme', () => {
    it('should store the theme in LocalStorage and call setDarkTheme for dark theme', () => {
      spyOn(service as any, 'setDarkTheme').and.callThrough(); // Espiar setDarkTheme

      service.setTheme(settingThemeValues.dark);

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        settingTheme.key,
        settingThemeValues.dark
      );
      expect(service['setDarkTheme']).toHaveBeenCalled();
    });

    it('should call setLightTheme for light theme', () => {
      spyOn(service as any, 'setLightTheme').and.callThrough(); // Espiar setLightTheme

      service.setTheme(settingThemeValues.light);

      expect(service['setLightTheme']).toHaveBeenCalled();
    });

    it('should call setSystemTheme for system theme', () => {
      spyOn(service as any, 'setSystemTheme').and.callThrough(); // Espiar setSystemTheme

      service.setTheme(settingThemeValues.system);

      expect(service['setSystemTheme']).toHaveBeenCalled();
    });
  });

  describe('getTheme', () => {
    it('should return the stored theme', () => {
      const storedTheme = settingThemeValues.dark;
      localStorageSpy.getItem.and.returnValue(storedTheme);

      const theme = service.getTheme();

      expect(theme).toBe(storedTheme);
    });

    it('should return the default theme if none is stored', () => {
      localStorageSpy.getItem.and.returnValue(null);

      const theme = service.getTheme();

      expect(theme).toBe(settingTheme.defaultValue);
    });
  });

  describe('clearTheme', () => {
    it('should remove the theme from LocalStorage', () => {
      service.clearTheme();

      expect(localStorageSpy.removeItem).toHaveBeenCalledWith(settingTheme.key);
    });
  });

  describe('setSystemTheme', () => {
    it('should set dark theme if system prefers dark', () => {
      spyOn(window, 'matchMedia').and.returnValue({
        matches: true,
      } as MediaQueryList);
      spyOn(service as any, 'setDarkTheme').and.callThrough();

      service['setSystemTheme']();

      expect(service['setDarkTheme']).toHaveBeenCalled();
    });

    it('should set light theme if system prefers light', () => {
      spyOn(window, 'matchMedia').and.returnValue({
        matches: false,
      } as MediaQueryList);
      spyOn(service as any, 'setLightTheme').and.callThrough();

      service['setSystemTheme']();

      expect(service['setLightTheme']).toHaveBeenCalled();
    });
  });

  describe('currentTheme$', () => {
    it('should emit the current theme when setTheme is called', done => {
      // Suscribirse al observable currentTheme$
      const subscription = service.currentTheme$.subscribe(theme => {
        if (theme === settingThemeValues.light) {
          // Si es light, cambiar a dark y verificar el nuevo valor
          service.setTheme(settingThemeValues.dark);
        } else if (theme === settingThemeValues.dark) {
          // Verificar que el nuevo valor es dark
          expect(theme).toBe(settingThemeValues.dark);
          subscription.unsubscribe(); // Desuscribirse después de la verificación
          done(); // Indicar que la prueba ha terminado
        }
      });

      // Establecer el tema inicial como light para probar el cambio
      service.setTheme(settingThemeValues.light);
    });
  });
});
