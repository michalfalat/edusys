import { createAction, props } from '@ngrx/store';
import { IAuthLoginUserRequest, IAuthLoginUserResponse, IAuthUserInfoResponse } from '@edusys/model';

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
