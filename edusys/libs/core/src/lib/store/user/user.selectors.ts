import { createFeatureSelector, createSelector } from '@ngrx/store';
import IUserState from './user.reducer';

const featureSelector = createFeatureSelector<IUserState>('user');

export const getUserList = createSelector(featureSelector, (state: IUserState) => state.list);
export const getUserDetail = createSelector(featureSelector, (state: IUserState) => state.detail);
