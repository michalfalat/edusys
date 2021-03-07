import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppFacade } from '../store/app/app.facade';

@Injectable({
  providedIn: 'root',
})
export class PendingRequestInterceptor implements HttpInterceptor {
  constructor(private appFacade: AppFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.appFacade.addPendingRequest(request.url);

    return next.handle(request).pipe(finalize(() => this.appFacade.removePendingRequest(request.url)));
  }
}
