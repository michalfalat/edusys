import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LangInterceptor implements HttpInterceptor {
  localStorageService: LocalStorageService;
  //translateService: TranslateService;
  constructor(injector: Injector) {
    this.localStorageService = injector.get(LocalStorageService);
    //this.translateService = injector.get(TranslateService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const language = 'sk'; //this.translateService.currentLang;
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
