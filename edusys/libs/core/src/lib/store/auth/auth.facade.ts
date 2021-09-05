import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  IAuthCreatePasswordRequest,
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
  IAuthUserInfoResponse,
  IAuthVerificationTokenInfoRequest,
  IAuthVerificationTokenInfoResponse,
} from '@edusys/model';
import {
  authCreatePasswordRequestAction,
  authLoginRequestAction,
  authLogoutAction,
  authUserInfoRequestAction,
  authVerifyTokenRequestAction,
} from './auth.actions';
import IAuthState from './auth.reducer';
import { getUserInfo } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<IAuthState>) {}
  getUserInfo$ = this.store.pipe(select(getUserInfo));

  login(payload: IAuthLoginUserRequest, onSucceeded?: (response: IAuthLoginUserResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(authLoginRequestAction({ payload, onSucceeded, onError }));
  }

  logout(onSucceeded?: () => void): void {
    this.store.dispatch(authLogoutAction({ onSucceeded }));
  }

  userInfo(onSucceeded?: (response: IAuthUserInfoResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(authUserInfoRequestAction({ onSucceeded, onError }));
  }

  verifyTokenInfo(
    payload: IAuthVerificationTokenInfoRequest,
    onSucceeded?: (response: IAuthVerificationTokenInfoResponse) => void,
    onError?: (response: HttpErrorResponse) => void,
  ): void {
    this.store.dispatch(authVerifyTokenRequestAction({ payload, onSucceeded, onError }));
  }

  createPassword(payload: IAuthCreatePasswordRequest, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(authCreatePasswordRequestAction({ payload, onSucceeded, onError }));
  }
}
