import { ILogDetailResponse, ILogFilterRequest, Pagination } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[LOG]';

export const logListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    request: ILogFilterRequest;
    onSucceeded?: (response: Pagination<ILogDetailResponse>) => void;
    onError?: (error: any) => void;
  }>()
);
export const logListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: Pagination<ILogDetailResponse>;
  }>()
);

export const logDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    logId: string;
    onSucceeded?: (response: ILogDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const logDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: ILogDetailResponse;
  }>()
);

export const logDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    logId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>()
);
export const logDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const logErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>()
);
