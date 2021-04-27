import { IModuleCreateRequest, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[MODULE]';

// FETCH MODULE LIST
export const moduleListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    onSucceeded?: (response: IModuleDetailResponse[]) => void;
    onError?: (error: any) => void;
  }>(),
);
export const moduleListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: IModuleDetailResponse[];
  }>(),
);

// MODULE DETAIL
export const moduleDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    moduleId: string;
    onSucceeded?: (response: IModuleDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const moduleDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IModuleDetailResponse;
  }>(),
);

// CREATE MODULE
export const moduleCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: IModuleCreateRequest;
    onSucceeded?: (response: IModuleDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const moduleCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: IModuleDetailResponse;
  }>(),
);

// EDIT MODULE
export const moduleEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    moduleId: string;
    payload: IModuleEditRequest;
    onSucceeded?: (response: IModuleDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const moduleEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: IModuleDetailResponse;
  }>(),
);

// DELETE MODULE
export const moduleDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    moduleId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const moduleDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const moduleErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
