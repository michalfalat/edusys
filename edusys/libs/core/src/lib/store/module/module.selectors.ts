import { createFeatureSelector, createSelector } from '@ngrx/store';
import IModuleState from './module.reducer';

const featureSelector = createFeatureSelector<IModuleState>('module');

export const getModuleList = createSelector(featureSelector, (state: IModuleState) => state.list);
export const getModuleDetail = createSelector(featureSelector, (state: IModuleState) => state.detail);
