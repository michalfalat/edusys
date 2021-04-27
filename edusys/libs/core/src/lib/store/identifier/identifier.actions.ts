import { IIdentifierCreateRequest, IIdentifierDetailResponse, IIdentifierEditRequest, IIdentifierFilterRequest, Pagination } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[IDENTIFIER]';

// FETCH IDENTIFIER LIST
export const identifierListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    request: IIdentifierFilterRequest;
    onSucceeded?: (response: Pagination<IIdentifierDetailResponse>) => void;
    onError?: (error: any) => void;
  }>()
);
export const identifierListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: Pagination<IIdentifierDetailResponse>;
  }>()
);

// IDENTIFIER DETAIL
export const identifierDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    identifierId: string;
    onSucceeded?: (response: IIdentifierDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const identifierDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IIdentifierDetailResponse;
  }>()
);

// CREATE IDENTIFIER
export const identifierCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: IIdentifierCreateRequest;
    onSucceeded?: (response: IIdentifierDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const identifierCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: IIdentifierDetailResponse;
  }>()
);

// EDIT IDENTIFIER
export const identifierEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    identifierId: string;
    payload: IIdentifierEditRequest;
    onSucceeded?: (response: IIdentifierDetailResponse) => void;
    onError?: (error: any) => void;
  }>()
);
export const identifierEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: IIdentifierDetailResponse;
  }>()
);

// DELETE IDENTIFIER
export const identifierDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    identifierId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>()
);
export const identifierDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const identifierErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>()
);
