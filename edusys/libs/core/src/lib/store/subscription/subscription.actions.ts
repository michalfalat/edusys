import {
  ISubscriptionCreateRequest,
  ISubscriptionDetailResponse,
  ISubscriptionEditRequest,
  ISubscriptionFilterRequest,
  ISubscriptionResponse,
  Pagination,
} from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[SUBSCRIPTION]';

// FETCH SUBSCRIPTION LIST
export const subscriptionListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    request: ISubscriptionFilterRequest;
    onSucceeded?: (response: Pagination<ISubscriptionResponse>) => void;
    onError?: (error: any) => void;
  }>(),
);
export const subscriptionListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: Pagination<ISubscriptionResponse>;
  }>(),
);

// SUBSCRIPTION DETAIL
export const subscriptionDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    subscriptionId: string;
    onSucceeded?: (response: ISubscriptionDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const subscriptionDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: ISubscriptionDetailResponse;
  }>(),
);

// CREATE SUBSCRIPTION
export const subscriptionCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: ISubscriptionCreateRequest;
    onSucceeded?: (response: ISubscriptionDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const subscriptionCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: ISubscriptionDetailResponse;
  }>(),
);

// EDIT SUBSCRIPTION
export const subscriptionEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    subscriptionId: string;
    payload: ISubscriptionEditRequest;
    onSucceeded?: (response: ISubscriptionDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const subscriptionEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: ISubscriptionDetailResponse;
  }>(),
);

// DELETE SUBSCRIPTION
export const subscriptionDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    subscriptionId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const subscriptionDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const subscriptionErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
