import { IAuthInitDataResponse, IAuthLoginUserResponse, IAuthUserInfoResponse } from '@edusys/model';
import { Action, createReducer, on } from '@ngrx/store';
import { authInitDataResponseAction, authLoginResponseAction, authLogoutAction, authUserInfoResponseAction } from './auth.actions';

export default interface IAuthState {
  loggedUser?: IAuthLoginUserResponse;
  initData?: IAuthInitDataResponse;
  userInfo?: IAuthUserInfoResponse;
}

export const initialState: IAuthState = {};

const _authReducer = createReducer(
  initialState,
  on(authLoginResponseAction, (state: IAuthState, payload) => {
    return { ...state, loggedUser: payload?.response };
  }),

  on(authUserInfoResponseAction, (state: IAuthState, payload) => {
    return { ...state, userInfo: payload?.response };
  }),
  on(authInitDataResponseAction, (state: IAuthState, payload) => {
    return { ...state, initData: payload?.response };
  }),
  on(authLogoutAction, () => {
    return {};
  }),
);

export function authReducer(state: IAuthState, action: Action): any {
  return _authReducer(state, action);
}
