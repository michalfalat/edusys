import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LogService } from '../../services/log/log.service';
import {
  logDeleteRequestAction,
  logDeleteResponseAction,
  logDetailRequestAction,
  logDetailResponseAction,
  logErrorAction,
  logListRequestAction,
  logListResponseAction,
} from './log.actions';

@Injectable()
export class LogEffects {
  constructor(private actions$: Actions, private logService: LogService) {}

  fetchLogList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logListRequestAction),
      mergeMap(({ request, onSucceeded, onError }) =>
        this.logService.fetchLogList(request).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return logListResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(logErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchLogDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logDetailRequestAction),
      mergeMap(({ logId, onSucceeded, onError }) =>
        this.logService.fetchLogDetail(logId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return logDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(logErrorAction({ error }));
          })
        )
      )
    )
  );

  deleteLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logDeleteRequestAction),
      mergeMap(({ logId, onSucceeded, onError }) =>
        this.logService.deleteLog(logId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return logDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(logErrorAction({ error }));
          })
        )
      )
    )
  );
}
