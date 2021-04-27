import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  subscriptionCreateRequestAction,
  subscriptionCreateResponseAction,
  subscriptionDetailRequestAction,
  subscriptionDetailResponseAction,
  subscriptionEditRequestAction,
  subscriptionEditResponseAction,
  subscriptionErrorAction,
  subscriptionListRequestAction,
  subscriptionListResponseAction,
  subscriptionDeleteRequestAction,
  subscriptionDeleteResponseAction,
} from './subscription.actions';
import { of } from 'rxjs';
import { SubscriptionService } from '../../services/subscription/subscription.service';

@Injectable()
export class SubscriptionEffects {
  constructor(private actions$: Actions, private subscriptionService: SubscriptionService) {}

  fetchSubscriptionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscriptionListRequestAction),
      mergeMap(({ onSucceeded, onError, request }) =>
        this.subscriptionService.fetchSubscriptionList(request).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return subscriptionListResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(subscriptionErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  fetchSubscriptionDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscriptionDetailRequestAction),
      mergeMap(({ subscriptionId, onSucceeded, onError }) =>
        this.subscriptionService.fetchSubscriptionDetail(subscriptionId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return subscriptionDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(subscriptionErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  createSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscriptionCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.subscriptionService.createSubscription(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return subscriptionCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(subscriptionErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  editSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscriptionEditRequestAction),
      mergeMap(({ payload, subscriptionId, onSucceeded, onError }) =>
        this.subscriptionService.editSubscription(subscriptionId, payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return subscriptionEditResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(subscriptionErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  deleteSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(subscriptionDeleteRequestAction),
      mergeMap(({ subscriptionId, onSucceeded, onError }) =>
        this.subscriptionService.deleteSubscription(subscriptionId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return subscriptionDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(subscriptionErrorAction({ error }));
          }),
        ),
      ),
    ),
  );
}
