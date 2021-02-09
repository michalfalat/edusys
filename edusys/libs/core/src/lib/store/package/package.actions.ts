import { IPackageCreateRequest, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[PACKAGE]';

// FETCH PACKAGE LIST
export const packageListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    onSucceeded?: (response: IPackageDetailResponse[]) => void;
    onError?: (error: any) => void;
  }>()
);
export const packageListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: IPackageDetailResponse[];
  }>()
);

// PACKAGE DETAIL
export const packageDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    packageId: string;
    onSucceeded?: (response: IPackageDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const packageDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IPackageDetailResponse;
  }>()
);

// CREATE PACKAGE
export const packageCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: IPackageCreateRequest;
    onSucceeded?: (response: IPackageDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const packageCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: IPackageDetailResponse;
  }>()
);

// EDIT PACKAGE
export const packageEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    packageId: string;
    payload: IPackageEditRequest;
    onSucceeded?: (response: IPackageDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const packageEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: IPackageDetailResponse;
  }>()
);

// DELETE PACKAGE
export const packageDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    packageId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>()
);
export const packageDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const packageErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>()
);
