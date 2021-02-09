import { createFeatureSelector, createSelector } from '@ngrx/store';
import IPackageState from './package.reducer';

const featureSelector = createFeatureSelector<IPackageState>('package');

export const getPackageList = createSelector(featureSelector, (state: IPackageState) => state.list);
export const getPackageDetail = createSelector(featureSelector, (state: IPackageState) => state.detail);
