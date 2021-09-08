import { createFeatureSelector, createSelector } from '@ngrx/store';
import IAuthState from './auth.reducer';

const featureSelector = createFeatureSelector<IAuthState>('auth');

export const getUserInfo = createSelector(featureSelector, (state: IAuthState) => state.userInfo);
export const getInitData = createSelector(featureSelector, (state: IAuthState) => state.initData);
