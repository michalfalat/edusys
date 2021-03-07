import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addPendingRequestAction, removePendingRequestAction } from './app.actions';
import IAppState from './app.reducer';
import { getPendingRequests } from './app.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  constructor(private store: Store<IAppState>) {}
  getPendingRequests$ = this.store.pipe(select(getPendingRequests));

  addPendingRequest(id: string): void {
    this.store.dispatch(addPendingRequestAction({ id }));
  }

  removePendingRequest(id: string): void {
    this.store.dispatch(removePendingRequestAction({ id }));
  }
}
