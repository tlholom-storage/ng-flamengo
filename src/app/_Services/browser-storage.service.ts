import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  constructor() {}

  getLocal(key: string): any {
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setLocal(key: string, value: any): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }

  removeLocal(key: string): void {
    window.localStorage.removeItem(key);
  }

  removeAllLocals(): void {
    for (const key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        this.removeLocal(key);
      }
    }
  }
}
