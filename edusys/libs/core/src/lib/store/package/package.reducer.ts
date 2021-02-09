import { Action, createReducer, on } from '@ngrx/store';
import { IPackageDetailResponse } from '@edusys/model';
import { packageDetailResponseAction, packageListResponseAction } from './package.actions';

export default interface IPackageState {
  list?: IPackageDetailResponse[];
  detail?: IPackageDetailResponse;
}

export const initialState: IPackageState = {};

const _packageReducer = createReducer(
  initialState,
  on(packageListResponseAction, (state: IPackageState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(packageDetailResponseAction, (state: IPackageState, payload) => {
    return { ...state, detail: payload?.response };
  })
);

export function packageReducer(state: IPackageState, action: Action): any {
  return _packageReducer(state, action);
}
