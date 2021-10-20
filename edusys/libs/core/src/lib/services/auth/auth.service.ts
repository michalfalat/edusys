import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
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
import { loginUrl, userInfoUrl, logoutUrl, verifyTokenUrl, createPasswordUrl, initDataUrl, changePasswordUrl } from './auth.endpoints';
import { APP_CONFIG } from '@edusys/app-config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppLocalStorageKeys } from '../../model/app/app.model';
import jwt_decode from 'jwt-decode';
import memoize from 'lodash-es/memoize';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = from(this.getAuthToken());
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, @Inject(APP_CONFIG) private appConfig: any) {}

  baseUrl(): string {
    return this.appConfig.apiUrl;
  }

  getAuthToken(): string {
    return this.localStorageService.get(AppLocalStorageKeys.AUTH_TOKEN);
  }

  getDecodedAuthToken(): any {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    } else {
      return this.memoizedDecodeJwt(token);
    }
  }

  decodeJwt = (token: string) => jwt_decode(token);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  memoizedDecodeJwt = memoize(this.decodeJwt);

  saveAuthToken(token: string): void {
    this.localStorageService.set(AppLocalStorageKeys.AUTH_TOKEN, token);
  }

  clearAuthToken(): void {
    this.localStorageService.remove(AppLocalStorageKeys.AUTH_TOKEN);
  }

  login = (payload: IAuthLoginUserRequest): Observable<IAuthLoginUserResponse> => {
    return this.httpClient.post<IAuthLoginUserResponse>(loginUrl(this.baseUrl()), payload);
  };

  logout = (): Observable<void> => {
    return this.httpClient.post<void>(logoutUrl(this.baseUrl()), {});
  };

  userInfo = (): Observable<IAuthUserInfoResponse> => {
    return this.httpClient.get<IAuthUserInfoResponse>(userInfoUrl(this.baseUrl()));
  };

  initData = (): Observable<IAuthInitDataResponse> => {
    return this.httpClient.post<IAuthInitDataResponse>(initDataUrl(this.baseUrl()), {});
  };

  verifyTokenInfo = (payload: IAuthVerificationTokenInfoRequest): Observable<IAuthVerificationTokenInfoResponse> => {
    return this.httpClient.post<IAuthVerificationTokenInfoResponse>(verifyTokenUrl(this.baseUrl()), payload);
  };

  createPassword = (payload: IAuthCreatePasswordRequest): Observable<void> => {
    return this.httpClient.post<void>(createPasswordUrl(this.baseUrl()), payload);
  };

  changePassword = (payload: IAuthUserChangePasswordRequest): Observable<void> => {
    return this.httpClient.post<void>(changePasswordUrl(this.baseUrl()), payload);
  };
}
