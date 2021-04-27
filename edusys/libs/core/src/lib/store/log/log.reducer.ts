import { ILogDetailResponse, ILogFilterRequest, Pagination } from '@edusys/model';
import { Action, createReducer, on } from '@ngrx/store';
import { logDetailResponseAction, logListRequestAction, logListResponseAction } from './log.actions';

export default interface ILogState {
  filter?: ILogFilterRequest;
  list?: Pagination<ILogDetailResponse>;
  detail?: ILogDetailResponse;
}

export const initialState: ILogState = {};

const _logReducer = createReducer(
  initialState,
  on(logListRequestAction, (state: ILogState, payload) => {
    return { ...state, filter: payload?.request };
  }),
  on(logListResponseAction, (state: ILogState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(logDetailResponseAction, (state: ILogState, payload) => {
    return { ...state, detail: payload?.response };
  }),
);

export function logReducer(state: ILogState, action: Action): any {
  return _logReducer(state, action);
}
