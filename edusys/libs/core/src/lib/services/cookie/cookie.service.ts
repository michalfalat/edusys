import { Injectable } from '@angular/core';
import * as ngxCookie from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private cookieService: ngxCookie.CookieService) {}

  get = (key: string): string => this.cookieService.get(key);
  set = (key: string, value: any): void => this.cookieService.set(key, value);
  remove = (key: string): void => this.cookieService.delete(key);
}
