import { createFeatureSelector, createSelector } from '@ngrx/store';
import IAppState from './app.reducer';

const featureSelector = createFeatureSelector<IAppState>('app');

export const getPendingRequests = createSelector(featureSelector, (state: IAppState) => state.pendingRequests);
