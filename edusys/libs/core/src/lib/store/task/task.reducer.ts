import { Action, createReducer, on } from '@ngrx/store';
import { ITaskDetailResponse, Pagination } from '@edusys/model';
import { taskAssignResponseAction, taskDetailResponseAction, taskEditResponseAction, taskFinishResponseAction, taskListResponseAction } from './task.actions';

export default interface ITaskState {
  list?: Pagination<ITaskDetailResponse>;
  detail?: ITaskDetailResponse;
}

export const initialState: ITaskState = {};

const _taskReducer = createReducer(
  initialState,
  on(taskListResponseAction, (state: ITaskState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(taskEditResponseAction, (state: ITaskState, payload) => {
    return { ...state, detail: payload?.response };
  }),
  on(taskAssignResponseAction, (state: ITaskState, payload) => {
    return { ...state, detail: payload?.response };
  }),
  on(taskFinishResponseAction, (state: ITaskState, payload) => {
    return { ...state, detail: payload?.response };
  }),
  on(taskDetailResponseAction, (state: ITaskState, payload) => {
    return { ...state, detail: payload?.response };
  }),
);

export function taskReducer(state: ITaskState, action: Action): any {
  return _taskReducer(state, action);
}
