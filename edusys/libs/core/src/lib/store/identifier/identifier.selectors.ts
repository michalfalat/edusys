import { createFeatureSelector, createSelector } from '@ngrx/store';
import IIdentifierState from './identifier.reducer';

const featureSelector = createFeatureSelector<IIdentifierState>('identifier');

export const getIdentifierList = createSelector(featureSelector, (state: IIdentifierState) => state.list);
export const getIdentifierDetail = createSelector(featureSelector, (state: IIdentifierState) => state.detail);
