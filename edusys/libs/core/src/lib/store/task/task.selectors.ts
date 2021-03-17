import { createFeatureSelector, createSelector } from '@ngrx/store';
import ITaskState from './task.reducer';

const featureSelector = createFeatureSelector<ITaskState>('task');

export const getTaskList = createSelector(featureSelector, (state: ITaskState) => state.list);
export const getTaskDetail = createSelector(featureSelector, (state: ITaskState) => state.detail);
