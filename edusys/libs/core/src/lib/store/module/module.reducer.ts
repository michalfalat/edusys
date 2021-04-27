import { Action, createReducer, on } from '@ngrx/store';
import { IModuleDetailResponse } from '@edusys/model';
import { moduleDetailResponseAction, moduleListResponseAction } from './module.actions';

export default interface IModuleState {
  list?: IModuleDetailResponse[];
  detail?: IModuleDetailResponse;
}

export const initialState: IModuleState = {};

const _moduleReducer = createReducer(
  initialState,
  on(moduleListResponseAction, (state: IModuleState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(moduleDetailResponseAction, (state: IModuleState, payload) => {
    return { ...state, detail: payload?.response };
  }),
);

export function moduleReducer(state: IModuleState, action: Action): any {
  return _moduleReducer(state, action);
}
