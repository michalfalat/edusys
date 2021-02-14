import { Action, createReducer, on } from '@ngrx/store';
import { IOrganizationDetailResponse } from '@edusys/model';
import { organizationDetailResponseAction, organizationListResponseAction } from './organization.actions';

export default interface IOrganizationState {
  list?: IOrganizationDetailResponse[];
  detail?: IOrganizationDetailResponse;
}

export const initialState: IOrganizationState = {};

const _organizationReducer = createReducer(
  initialState,
  on(organizationListResponseAction, (state: IOrganizationState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(organizationDetailResponseAction, (state: IOrganizationState, payload) => {
    return { ...state, detail: payload?.response };
  })
);

export function organizationReducer(state: IOrganizationState, action: Action): any {
  return _organizationReducer(state, action);
}
