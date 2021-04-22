import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ISubscriptionCreateRequest,
  ISubscriptionDetailResponse,
  ISubscriptionEditRequest,
  ISubscriptionFilterRequest,
  ISubscriptionResponse,
  Pagination,
} from '@edusys/model';
import {
  subscriptionCreateRequestAction,
  subscriptionDeleteRequestAction,
  subscriptionDetailRequestAction,
  subscriptionEditRequestAction,
  subscriptionListRequestAction,
} from './subscription.actions';
import { getSubscriptionDetail, getSubscriptionList } from './subscription.selectors';
import ISubscriptionState from './subscription.reducer';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionFacade {
  constructor(private store: Store<ISubscriptionState>) {}
  getSubscriptionList$ = this.store.pipe(select(getSubscriptionList));
  getSubscriptionDetail$ = this.store.pipe(select(getSubscriptionDetail));

  fetchSubscriptionList(
    request: ISubscriptionFilterRequest,
    onSucceeded?: (response: Pagination<ISubscriptionResponse>) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(subscriptionListRequestAction({ request, onSucceeded, onError }));
  }

  fetchSubscriptionDetail(
    subscriptionId: string,
    onSucceeded?: (response: ISubscriptionDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(subscriptionDetailRequestAction({ subscriptionId, onSucceeded, onError }));
  }

  editSubscription(
    subscriptionId: string,
    payload: ISubscriptionEditRequest,
    onSucceeded?: (response: ISubscriptionDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(subscriptionEditRequestAction({ subscriptionId, payload, onSucceeded, onError }));
  }

  createSubscription(
    payload: ISubscriptionCreateRequest,
    onSucceeded?: (response: ISubscriptionDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(subscriptionCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteSubscription(subscriptionId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(subscriptionDeleteRequestAction({ subscriptionId, onSucceeded, onError }));
  }
}
