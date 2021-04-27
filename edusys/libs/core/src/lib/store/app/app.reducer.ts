import { Action, createReducer, on } from '@ngrx/store';
import { addPendingRequestAction, removePendingRequestAction } from './app.actions';

export default interface IAppState {
  pendingRequests: any[];
}

export const initialState: IAppState = { pendingRequests: [] };

const _appReducer = createReducer(
  initialState,
  on(addPendingRequestAction, (state: IAppState, payload) => {
    return { ...state, pendingRequests: [...state.pendingRequests, payload.id] };
  }),
  on(removePendingRequestAction, (state: IAppState, payload) => {
    return { ...state, pendingRequests: state.pendingRequests.filter((p) => p !== payload.id) };
  }),
);

export function appReducer(state: IAppState, action: Action): any {
  return _appReducer(state, action);
}
