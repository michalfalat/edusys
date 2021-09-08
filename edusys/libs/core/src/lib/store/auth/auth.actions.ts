import { createAction, props } from '@ngrx/store';
import {
  IAuthCreatePasswordRequest,
  IAuthInitDataResponse,
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
  IAuthUserInfoResponse,
  IAuthVerificationTokenInfoRequest,
  IAuthVerificationTokenInfoResponse,
} from '@edusys/model';

const PREFIX = '[AUTH]';

// LOGIN
export const authLoginRequestAction = createAction(
  `${PREFIX} LOGIN REQUEST`,
  props<{
    payload: IAuthLoginUserRequest;
    onSucceeded?: (response: IAuthLoginUserResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const authLoginResponseAction = createAction(
  `${PREFIX} LOGIN RESPONSE`,
  props<{
    response: IAuthLoginUserResponse;
  }>(),
);

// INIT DATA
export const authInitDataRequestAction = createAction(
  `${PREFIX} INIT DATA REQUEST`,
  props<{
    onSucceeded?: (response: IAuthInitDataResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const authInitDataResponseAction = createAction(
  `${PREFIX} INIT DATA RESPONSE`,
  props<{
    response: IAuthInitDataResponse;
  }>(),
);

// USER INFO
export const authUserInfoRequestAction = createAction(
  `${PREFIX} USER-INFO REQUEST`,
  props<{
    onSucceeded?: (response: IAuthUserInfoResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const authUserInfoResponseAction = createAction(
  `${PREFIX} USER-INFO RESPONSE`,
  props<{
    response: IAuthUserInfoResponse;
  }>(),
);

// ERROR
export const authLogoutAction = createAction(
  `${PREFIX} LOGOUT`,
  props<{
    onSucceeded?: () => void;
  }>(),
);

// VERIFY TOKEN
export const authVerifyTokenRequestAction = createAction(
  `${PREFIX} VERIFY TOKEN REQUEST`,
  props<{
    payload: IAuthVerificationTokenInfoRequest;
    onSucceeded?: (response: IAuthVerificationTokenInfoResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const authVerifyTokenResponseAction = createAction(
  `${PREFIX} VERIFY TOKEN RESPONSE`,
  props<{
    response: IAuthVerificationTokenInfoResponse;
  }>(),
);

// CREATE PASSWORD
export const authCreatePasswordRequestAction = createAction(
  `${PREFIX} CREATE PASSWORD REQUEST`,
  props<{
    payload: IAuthCreatePasswordRequest;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const authCreatePasswordResponseAction = createAction(`${PREFIX} CREATE PASSWORD RESPONSE`);

// ERROR
export const authErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
