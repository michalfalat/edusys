import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable()
export class LangInterceptor implements HttpInterceptor {
  localStorageService: LocalStorageService;
  constructor(injector: Injector) {
    this.localStorageService = injector.get(LocalStorageService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const language = 'sk'; //this.translateService.getCurrentLanguage();
    if (!!language) {
      request = request.clone({
        setHeaders: {
          'Accept-Language': language,
        },
      });
    }

    return next.handle(request);
  }
}
