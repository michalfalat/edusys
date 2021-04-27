import {
  ICompanyInfoDetailResponse,
  ICompanyInfoEditRequest,
  IOrganizationCreateRequest,
  IOrganizationDetailResponse,
  IOrganizationEditRequest,
} from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[ORGANIZATION]';

// FETCH ORGANIZATION LIST
export const organizationListRequestAction = createAction(
  `${PREFIX} LIST REQUEST`,
  props<{
    onSucceeded?: (response: IOrganizationDetailResponse[]) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationListResponseAction = createAction(
  `${PREFIX} LIST RESPONSE`,
  props<{
    response: IOrganizationDetailResponse[];
  }>(),
);

// ORGANIZATION DETAIL
export const organizationDetailRequestAction = createAction(
  `${PREFIX} DETAIL REQUEST`,
  props<{
    organizationId: string;
    onSucceeded?: (response: IOrganizationDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationDetailResponseAction = createAction(
  `${PREFIX} DETAIL RESPONSE`,
  props<{
    response: IOrganizationDetailResponse;
  }>(),
);

// ORGANIZATION DETAIL
export const organizationAvailablePermissionsRequestAction = createAction(
  `${PREFIX} AVAILABLE PERMISSIONS REQUEST`,
  props<{
    organizationId: string;
    onSucceeded?: (response: string[]) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationAvailablePermissionsResponseAction = createAction(
  `${PREFIX} AVAILABLE PERMISSIONS  RESPONSE`,
  props<{
    response: string[];
  }>(),
);

// ORGANIZATION COMPANY INFO
export const companyInfoDetailRequestAction = createAction(
  `${PREFIX} COMPANY INFO DETAIL REQUEST`,
  props<{
    onSucceeded?: (response: ICompanyInfoDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const companyInfoDetailResponseAction = createAction(
  `${PREFIX} COMPANY INFO DETAIL RESPONSE`,
  props<{
    response: ICompanyInfoDetailResponse;
  }>(),
);

// EDIT COMPANY INFO
export const companyInfoEditRequestAction = createAction(
  `${PREFIX} COMPANY INFO EDIT REQUEST`,
  props<{
    payload: ICompanyInfoEditRequest;
    onSucceeded?: (response: ICompanyInfoDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const companyInfoEditResponseAction = createAction(
  `${PREFIX} COMPANY INFO EDIT RESPONSE`,
  props<{
    response: ICompanyInfoDetailResponse;
  }>(),
);

// CREATE ORGANIZATION
export const organizationCreateRequestAction = createAction(
  `${PREFIX} CREATE REQUEST`,
  props<{
    payload: IOrganizationCreateRequest;
    onSucceeded?: (response: IOrganizationDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationCreateResponseAction = createAction(
  `${PREFIX} CREATE RESPONSE`,
  props<{
    response: IOrganizationDetailResponse;
  }>(),
);

// EDIT ORGANIZATION
export const organizationEditRequestAction = createAction(
  `${PREFIX} EDIT REQUEST`,
  props<{
    organizationId: string;
    payload: IOrganizationEditRequest;
    onSucceeded?: (response: IOrganizationDetailResponse) => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationEditResponseAction = createAction(
  `${PREFIX} EDIT RESPONSE`,
  props<{
    response: IOrganizationDetailResponse;
  }>(),
);

// DELETE ORGANIZATION
export const organizationDeleteRequestAction = createAction(
  `${PREFIX} DELETE REQUEST`,
  props<{
    organizationId: string;
    onSucceeded?: () => void;
    onError?: (error: any) => void;
  }>(),
);
export const organizationDeleteResponseAction = createAction(`${PREFIX} DELETE RESPONSE`);

// ERROR
export const organizationErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>(),
);
