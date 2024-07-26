import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Método para guardar datos en el localStorage
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error(`Error al guardar en localStorage: ${e}`);
    }
  }

  // Método para recuperar datos del localStorage
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (e) {
      console.error(`Error al recuperar del localStorage: ${e}`);
      return null;
    }
  }

  // Método para eliminar un ítem del localStorage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error al eliminar del localStorage: ${e}`);
    }
  }

  // Método para limpiar todo el localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(`Error al limpiar el localStorage: ${e}`);
    }
  }
}
