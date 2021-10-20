import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  IAuthCreatePasswordRequest,
  IAuthInitDataResponse,
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
  IAuthUserChangePasswordRequest,
  IAuthUserInfoResponse,
  IAuthVerificationTokenInfoRequest,
  IAuthVerificationTokenInfoResponse,
} from '@edusys/model';
import {
  authChangePasswordRequestAction,
  authCreatePasswordRequestAction,
  authInitDataRequestAction,
  authLoginRequestAction,
  authLogoutAction,
  authUserInfoRequestAction,
  authVerifyTokenRequestAction,
} from './auth.actions';
import IAuthState from './auth.reducer';
import { getInitData, getUserInfo } from './auth.selectors';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<IAuthState>, private authService: AuthService) {}
  getUserInfo$ = this.store.pipe(select(getUserInfo));
  getInitData$ = this.store.pipe(select(getInitData));

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

  changePassword(payload: IAuthUserChangePasswordRequest, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(authChangePasswordRequestAction({ payload, onSucceeded, onError }));
  }

  fetchInitData(onSucceeded?: (response: IAuthInitDataResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(authInitDataRequestAction({ onSucceeded, onError }));
  }
}
