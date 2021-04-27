import { IUserCreateRequest, IUserDetailResponse, IUserEditRequest } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[USER]';

export const userListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    onSucceeded?: (response: IUserDetailResponse[]) => void;
    onError?: (error: any) => void;
  }>(),
);
export const userListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: IUserDetailResponse[];
  }>(),
);

export const userDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    userId: string;
    onSucceeded?: (response: IUserDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const userDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IUserDetailResponse;
  }>(),
);

export const userCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: IUserCreateRequest;
    onSucceeded?: (response: IUserDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const userCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: IUserDetailResponse;
  }>(),
);

export const userEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    userId: string;
    payload: IUserEditRequest;
    onSucceeded?: (response: IUserDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const userEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: IUserDetailResponse;
  }>(),
);

export const userDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    userId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const userDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const userErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
