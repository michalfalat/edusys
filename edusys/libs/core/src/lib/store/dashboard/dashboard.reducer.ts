import { IDashboardResponse } from '@edusys/model';
import { Action, createReducer, on } from '@ngrx/store';
import { dashboardResponseAction } from './dashboard.actions';

export default interface IDashboardState {
  dashboardData?: IDashboardResponse;
}

export const initialState: IDashboardState = {};

const _dashboardReducer = createReducer(
  initialState,
  on(dashboardResponseAction, (state: IDashboardState, payload) => {
    return { ...state, dashboardData: payload?.response };
  }),
);

export function dashboardReducer(state: IDashboardState, action: Action): any {
  return _dashboardReducer(state, action);
}
