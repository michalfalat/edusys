import { createFeatureSelector, createSelector } from '@ngrx/store';
import IOrganizationRoleState from './organization-role.reducer';

const featureSelector = createFeatureSelector<IOrganizationRoleState>('organizationRole');

export const getOrganizationRoleList = createSelector(featureSelector, (state: IOrganizationRoleState) => state.list);
export const getOrganizationRoleDetail = createSelector(featureSelector, (state: IOrganizationRoleState) => state.detail);
