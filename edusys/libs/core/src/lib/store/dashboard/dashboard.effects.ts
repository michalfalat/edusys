import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { dashboardErrorAction, dashboardRequestAction, dashboardResponseAction } from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private dashboardService: DashboardService) {}

  dashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.dashboardService.dashboard().pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return dashboardResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(dashboardErrorAction({ error }));
          }),
        ),
      ),
    ),
  );
}
