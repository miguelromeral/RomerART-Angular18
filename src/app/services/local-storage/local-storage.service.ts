import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageService } from '@ng-web-apis/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    LocalStorageService.isBrowser.next(isPlatformBrowser(platformId));
  }

  // Método para guardar datos en el localStorage
  setItem(key: string, value: string): void {
    if (LocalStorageService.isBrowser) {
      try {
        this.storage.setItem(key, value);
      } catch (e) {
        console.error(`Error al guardar en localStorage: ${e}`);
      }
    } else {
      console.warn('Storage not supported in Server side');
    }
  }

  // Método para recuperar datos del localStorage
  getItem(key: string): string | null {
    if (LocalStorageService.isBrowser) {
      try {
        return this.storage.getItem(key);
      } catch (e) {
        console.error(`Error al recuperar del localStorage: ${e}`);
        return null;
      }
    } else {
      console.warn('Storage not supported in Server side');
    }
    return '---';
  }

  // Método para eliminar un ítem del localStorage
  removeItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      console.error(`Error al eliminar del localStorage: ${e}`);
    }
  }

  // Método para limpiar todo el localStorage
  clear(): void {
    try {
      this.storage.clear();
    } catch (e) {
      console.error(`Error al limpiar el localStorage: ${e}`);
    }
  }
}
