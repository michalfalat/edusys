import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  packageCreateRequestAction,
  packageCreateResponseAction,
  packageDetailRequestAction,
  packageDetailResponseAction,
  packageEditRequestAction,
  packageEditResponseAction,
  packageErrorAction,
  packageListRequestAction,
  packageListResponseAction,
  packageDeleteRequestAction,
  packageDeleteResponseAction,
} from './package.actions';
import { of } from 'rxjs';
import { PackageService } from '../../services/package/package.service';

@Injectable()
export class PackageEffects {
  constructor(private actions$: Actions, private packageService: PackageService) {}

  fetchPackageList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(packageListRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.packageService.fetchPackageList().pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return packageListResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(packageErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchPackageDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(packageDetailRequestAction),
      mergeMap(({ packageId, onSucceeded, onError }) =>
        this.packageService.fetchPackageDetail(packageId).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return packageDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(packageErrorAction({ error }));
          })
        )
      )
    )
  );

  createPackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(packageCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.packageService.createPackage(payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return packageCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(packageErrorAction({ error }));
          })
        )
      )
    )
  );

  editPackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(packageEditRequestAction),
      mergeMap(({ payload, packageId, onSucceeded, onError }) =>
        this.packageService.editPackage(packageId, payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return packageEditResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(packageErrorAction({ error }));
          })
        )
      )
    )
  );

  deletePackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(packageDeleteRequestAction),
      mergeMap(({ packageId, onSucceeded, onError }) =>
        this.packageService.deletePackage(packageId).pipe(
          map(() => {
            if (!!onSucceeded) {
              onSucceeded();
            }
            return packageDeleteResponseAction();
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(packageErrorAction({ error }));
          })
        )
      )
    )
  );
}
