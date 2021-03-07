import { createFeatureSelector, createSelector } from '@ngrx/store';
import IOrganizationState from './organization.reducer';

const featureSelector = createFeatureSelector<IOrganizationState>('organization');

export const getOrganizationList = createSelector(featureSelector, (state: IOrganizationState) => state.list);
export const getOrganizationDetail = createSelector(featureSelector, (state: IOrganizationState) => state.detail);
export const getCompanyInfoDetail = createSelector(featureSelector, (state: IOrganizationState) => state.companyInfo);
