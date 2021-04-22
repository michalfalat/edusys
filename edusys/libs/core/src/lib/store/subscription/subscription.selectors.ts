import { createFeatureSelector, createSelector } from '@ngrx/store';
import ISubscriptionState from './subscription.reducer';

const featureSelector = createFeatureSelector<ISubscriptionState>('subscription');

export const getSubscriptionList = createSelector(featureSelector, (state: ISubscriptionState) => state.list);
export const getSubscriptionDetail = createSelector(featureSelector, (state: ISubscriptionState) => state.detail);
