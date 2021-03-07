import { Action, createReducer, on } from '@ngrx/store';
import { ICompanyInfoDetailResponse, IOrganizationDetailResponse } from '@edusys/model';
import {
  companyInfoDetailResponseAction,
  companyInfoEditResponseAction,
  organizationDetailResponseAction,
  organizationListResponseAction,
} from './organization.actions';

export default interface IOrganizationState {
  list?: IOrganizationDetailResponse[];
  detail?: IOrganizationDetailResponse;
  companyInfo?: ICompanyInfoDetailResponse;
}

export const initialState: IOrganizationState = {};

const _organizationReducer = createReducer(
  initialState,
  on(organizationListResponseAction, (state: IOrganizationState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(organizationDetailResponseAction, (state: IOrganizationState, payload) => {
    return { ...state, detail: payload?.response };
  }),
  on(companyInfoDetailResponseAction, (state: IOrganizationState, payload) => {
    return { ...state, companyInfo: payload?.response };
  }),
  on(companyInfoEditResponseAction, (state: IOrganizationState, payload) => {
    return { ...state, companyInfo: payload?.response };
  })
);

export function organizationReducer(state: IOrganizationState, action: Action): any {
  return _organizationReducer(state, action);
}
