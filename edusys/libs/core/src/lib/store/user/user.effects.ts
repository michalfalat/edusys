import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  userCreateRequestAction,
  userCreateResponseAction,
  userDetailRequestAction,
  userDetailResponseAction,
  userEditRequestAction,
  userEditResponseAction,
  userErrorAction,
  userListRequestAction,
  userListResponseAction,
  userDeleteRequestAction,
  userDeleteResponseAction,
} from './user.actions';
import { of } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  fetchUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.userService.fetchUserList().pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return userListResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(userErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  fetchUserDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDetailRequestAction),
      mergeMap(({ userId, onSucceeded, onError }) =>
        this.userService.fetchUserDetail(userId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return userDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(userErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.userService.createUser(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return userCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(userErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userEditRequestAction),
      mergeMap(({ payload, userId, onSucceeded, onError }) =>
        this.userService.editUser(userId, payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return userEditResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(userErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDeleteRequestAction),
      mergeMap(({ userId, onSucceeded, onError }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return userDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(userErrorAction({ error }));
          }),
        ),
      ),
    ),
  );
}
