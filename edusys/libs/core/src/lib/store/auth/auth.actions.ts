import { createAction, props } from '@ngrx/store';
import { IAuthLoginUserRequest, IAuthLoginUserResponse, IAuthRegisterUserRequest, IAuthRegisterUserResponse, IAuthUserInfoResponse } from '../../model/auth/auth.model';

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

// REGISTER
export const authRegisterRequestAction = createAction(
  `${PREFIX} REGISTER REQUEST`,
  props<{
    payload: IAuthRegisterUserRequest;
    onSucceeded?: (response: IAuthRegisterUserResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const authRegisterResponseAction = createAction(
  `${PREFIX} REGISTER RESPONSE`,
  props<{
    response: IAuthRegisterUserResponse;
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

// ERROR
export const authErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
