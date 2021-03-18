import { IFileUploadRequest, IFileDetailResponse } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[FILE]';

// FILE DETAIL
export const fileDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    fileId: string;
    onSucceeded?: (response: IFileDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const fileDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IFileDetailResponse;
  }>()
);

// UPLOAD FILE
export const fileUploadRequestAction = createAction(
  `${PREFIX} UPLOAD REQUEST`,
  props<{
    payload: FormData;
    onSucceeded?: (response: IFileDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const fileUploadResponseAction = createAction(
  `${PREFIX} UPLOAD RESPONSE`,
  props<{
    response: IFileDetailResponse;
  }>()
);

// DELETE FILE
export const fileDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    fileId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>()
);
export const fileDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const fileErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>()
);
