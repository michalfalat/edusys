import { IOrganizationRoleCreateRequest, IOrganizationRoleDetailResponse, IOrganizationRoleEditRequest } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[ORGANIZATION-ROLE]';

export const organizationRoleListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    onSucceeded?: (response: IOrganizationRoleDetailResponse[]) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationRoleListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: IOrganizationRoleDetailResponse[];
  }>(),
);

export const organizationRoleDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    organizationRoleId: string;
    onSucceeded?: (response: IOrganizationRoleDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationRoleDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IOrganizationRoleDetailResponse;
  }>(),
);

export const organizationRoleCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: IOrganizationRoleCreateRequest;
    onSucceeded?: (response: IOrganizationRoleDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationRoleCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: IOrganizationRoleDetailResponse;
  }>(),
);

export const organizationRoleEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    organizationRoleId: string;
    payload: IOrganizationRoleEditRequest;
    onSucceeded?: (response: IOrganizationRoleDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationRoleEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: IOrganizationRoleDetailResponse;
  }>(),
);

export const organizationRoleDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    organizationRoleId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationRoleDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const organizationRoleErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
