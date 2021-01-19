import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { LangInterceptor } from './lang.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LangInterceptor,
    multi: true,
  },
];
