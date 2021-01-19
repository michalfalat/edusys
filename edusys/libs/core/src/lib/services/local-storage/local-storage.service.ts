import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get = (key: string): string => JSON.parse(localStorage.getItem(key));
  set = (key: string, value: any): void => localStorage.setItem(key, JSON.stringify(value));
  remove = (key: string): void => localStorage.removeItem(key);
  clearAll = (): void => localStorage.clear();
}
