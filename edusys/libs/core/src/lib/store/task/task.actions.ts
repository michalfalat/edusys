import { ITaskAssignRequest, ITaskCreateRequest, ITaskDetailResponse, ITaskEditRequest, ITaskFinishRequest } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[TASK]';

// FETCH TASK LIST
export const taskListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    onSucceeded?: (response: ITaskDetailResponse[]) => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: ITaskDetailResponse[];
  }>(),
);

// TASK DETAIL
export const taskDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    taskId: string;
    onSucceeded?: (response: ITaskDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: ITaskDetailResponse;
  }>(),
);

// CREATE TASK
export const taskCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: ITaskCreateRequest;
    onSucceeded?: (response: ITaskDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: ITaskDetailResponse;
  }>(),
);

// EDIT TASK
export const taskEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    taskId: string;
    payload: ITaskEditRequest;
    onSucceeded?: (response: ITaskDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: ITaskDetailResponse;
  }>(),
);

// ASSIGN TASK
export const taskAssignRequestAction = createAction(
  `${PREFIX} ASSIGN REQUEST`,
  props<{
    taskId: string;
    payload: ITaskAssignRequest;
    onSucceeded?: (response: ITaskDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskAssignResponseAction = createAction(
  `${PREFIX} ASSIGN RESPONSE`,
  props<{
    response: ITaskDetailResponse;
  }>(),
);

// FINISH TASK
export const taskFinishRequestAction = createAction(
  `${PREFIX} FINISH REQUEST`,
  props<{
    taskId: string;
    payload: ITaskFinishRequest;
    onSucceeded?: (response: ITaskDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskFinishResponseAction = createAction(
  `${PREFIX} FINISH RESPONSE`,
  props<{
    response: ITaskDetailResponse;
  }>(),
);

// DELETE TASK
export const taskDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    taskId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const taskDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const taskErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
