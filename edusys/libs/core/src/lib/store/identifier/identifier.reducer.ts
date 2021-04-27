import { Action, createReducer, on } from '@ngrx/store';
import { IIdentifierDetailResponse, Pagination } from '@edusys/model';
import { identifierDetailResponseAction, identifierListResponseAction } from './identifier.actions';

export default interface IIdentifierState {
  list?: Pagination<IIdentifierDetailResponse>;
  detail?: IIdentifierDetailResponse;
}

export const initialState: IIdentifierState = {};

const _identifierReducer = createReducer(
  initialState,
  on(identifierListResponseAction, (state: IIdentifierState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(identifierDetailResponseAction, (state: IIdentifierState, payload) => {
    return { ...state, detail: payload?.response };
  })
);

export function identifierReducer(state: IIdentifierState, action: Action): any {
  return _identifierReducer(state, action);
}
