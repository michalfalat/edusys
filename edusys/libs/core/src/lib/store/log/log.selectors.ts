import { createFeatureSelector, createSelector } from '@ngrx/store';
import ILogState from './log.reducer';

const featureSelector = createFeatureSelector<ILogState>('log');

export const getLogFilter = createSelector(featureSelector, (state: ILogState) => state.filter);
export const getLogList = createSelector(featureSelector, (state: ILogState) => state.list);
export const getLogDetail = createSelector(featureSelector, (state: ILogState) => state.detail);
