import { Action, createReducer, on } from '@ngrx/store';
import { IOrganizationRoleDetailResponse } from '@edusys/model';
import { organizationRoleDetailResponseAction, organizationRoleListResponseAction } from './organization-role.actions';

export default interface IOrganizationRoleState {
  list?: IOrganizationRoleDetailResponse[];
  detail?: IOrganizationRoleDetailResponse;
}

export const initialState: IOrganizationRoleState = {};

const _organizationRoleReducer = createReducer(
  initialState,
  on(organizationRoleListResponseAction, (state: IOrganizationRoleState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(organizationRoleDetailResponseAction, (state: IOrganizationRoleState, payload) => {
    return { ...state, detail: payload?.response };
  }),
);

export function organizationRoleReducer(state: IOrganizationRoleState, action: Action): any {
  return _organizationRoleReducer(state, action);
}
