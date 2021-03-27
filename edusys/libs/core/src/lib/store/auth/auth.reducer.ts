import { Action, createReducer, on } from '@ngrx/store';
import { IAuthLoginUserResponse, IAuthUserInfoResponse } from '@edusys/model';
import { authLoginResponseAction, authLogoutAction, authUserInfoResponseAction } from './auth.actions';

export default interface IAuthState {
  loggedUser?: IAuthLoginUserResponse;
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
  on(authLogoutAction, (state: IAuthState) => {
    return {};
  })
);

export function authReducer(state: IAuthState, action: Action): any {
  return _authReducer(state, action);
}
