import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  authChangePasswordRequestAction,
  authChangePasswordResponseAction,
  authCreatePasswordRequestAction,
  authCreatePasswordResponseAction,
  authErrorAction,
  authInitDataRequestAction,
  authInitDataResponseAction,
  authLoginRequestAction,
  authLoginResponseAction,
  authLogoutAction,
  authResetPasswordRequestAction,
  authResetPasswordResponseAction,
  authUserInfoRequestAction,
  authUserInfoResponseAction,
  authVerifyTokenRequestAction,
  authVerifyTokenResponseAction,
} from './auth.actions';
import { AuthService } from './../../services/auth/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.authService.login(payload).pipe(
          map((response) => {
            this.authService.saveAuthToken(response?.token);
            if (onSucceeded) {
              onSucceeded(response);
            }
            return authLoginResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogoutAction),
        mergeMap(({ onSucceeded }) =>
          this.authService.logout().pipe(
            map(() => {
              this.authService.clearAuthToken();
              if (onSucceeded) {
                onSucceeded();
              }
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  userInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authUserInfoRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.authService.userInfo().pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return authUserInfoResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  initData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authInitDataRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.authService.initData().pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return authInitDataResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  verifyToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authVerifyTokenRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.authService.verifyTokenInfo(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return authVerifyTokenResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  createPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authCreatePasswordRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.authService.createPassword(payload).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return authCreatePasswordResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authResetPasswordRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.authService.resetPassword(payload).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return authResetPasswordResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authChangePasswordRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.authService.changePassword(payload).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return authChangePasswordResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(authErrorAction({ error }));
          }),
        ),
      ),
    ),
  );
}
