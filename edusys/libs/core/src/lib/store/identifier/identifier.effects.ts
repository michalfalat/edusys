import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  identifierCreateRequestAction,
  identifierCreateResponseAction,
  identifierDetailRequestAction,
  identifierDetailResponseAction,
  identifierEditRequestAction,
  identifierEditResponseAction,
  identifierErrorAction,
  identifierListRequestAction,
  identifierListResponseAction,
  identifierDeleteRequestAction,
  identifierDeleteResponseAction,
} from './identifier.actions';
import { of } from 'rxjs';
import { IdentifierService } from '../../services/identifier/identifier.service';

@Injectable()
export class IdentifierEffects {
  constructor(private actions$: Actions, private identifierService: IdentifierService) {}

  fetchIdentifierList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(identifierListRequestAction),
      mergeMap(({ onSucceeded, onError, request }) =>
        this.identifierService.fetchIdentifierList(request).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return identifierListResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(identifierErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchIdentifierDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(identifierDetailRequestAction),
      mergeMap(({ identifierId, onSucceeded, onError }) =>
        this.identifierService.fetchIdentifierDetail(identifierId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return identifierDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(identifierErrorAction({ error }));
          })
        )
      )
    )
  );

  createIdentifier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(identifierCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.identifierService.createIdentifier(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return identifierCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(identifierErrorAction({ error }));
          })
        )
      )
    )
  );

  editIdentifier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(identifierEditRequestAction),
      mergeMap(({ payload, identifierId, onSucceeded, onError }) =>
        this.identifierService.editIdentifier(identifierId, payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return identifierEditResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(identifierErrorAction({ error }));
          })
        )
      )
    )
  );

  deleteIdentifier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(identifierDeleteRequestAction),
      mergeMap(({ identifierId, onSucceeded, onError }) =>
        this.identifierService.deleteIdentifier(identifierId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return identifierDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(identifierErrorAction({ error }));
          })
        )
      )
    )
  );
}
