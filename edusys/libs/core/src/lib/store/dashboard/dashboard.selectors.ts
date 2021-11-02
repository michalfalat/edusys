import { createFeatureSelector, createSelector } from '@ngrx/store';
import IDashboardState from './dashboard.reducer';

const featureSelector = createFeatureSelector<IDashboardState>('dashboard');

export const getDashboardData = createSelector(featureSelector, (state: IDashboardState) => state.dashboardData);
