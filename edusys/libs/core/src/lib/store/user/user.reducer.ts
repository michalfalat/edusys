import { Action, createReducer, on } from '@ngrx/store';
import { IUserDetailResponse } from '@edusys/model';
import { userDetailResponseAction, userListResponseAction } from './user.actions';

export default interface IUserState {
  list?: IUserDetailResponse[];
  detail?: IUserDetailResponse;
}

export const initialState: IUserState = {};

const _userReducer = createReducer(
  initialState,
  on(userListResponseAction, (state: IUserState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(userDetailResponseAction, (state: IUserState, payload) => {
    return { ...state, detail: payload?.response };
  }),
);

export function userReducer(state: IUserState, action: Action): any {
  return _userReducer(state, action);
}
