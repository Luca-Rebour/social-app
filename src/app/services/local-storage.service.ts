import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log('Guardado en el local storage', key, value);
      
    } catch (e) {
      console.log('Error al guardar en el local storage', e);
    }
  }

  getItem(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
      console.log('Obtenido desde el local storage', key);
      
    } catch (e) {
      console.log('Error al obtener desde el local storage', e);
      return null;
    }
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log('Error al eliminar del local storage', e);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.log('Error al limpiar el local storage', e);
    }
  }

  isLoggedIn() {
    return !!this.getItem('IdUsuarioActivo');
  }
}
