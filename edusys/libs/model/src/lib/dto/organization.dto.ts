import { IAuthUserBasicResponse, IAuthUserInfoResponse } from './user.dto';
import { IAddress } from './common.dto';
import { ISubscriptionResponse, ISubscriptionDetailResponse } from './subscription.dto';
import { IOrganizationRoleDetailResponse } from '@edusys/model';

export interface IOrganizationInfo {
  owner: string;
  name: string;
  description: string;
  businessId?: string;
  status?: OrganizationStatus;
  taxId?: string;
  registrationNumberVAT?: string;
}

export interface IOrganizationCreateRequest {
  info: IOrganizationInfo;
  address?: IAddress;
  packageId: string;
}

export interface IOrganizationResponse {
  id: string;
  name: string;
  owner: IAuthUserBasicResponse;
  userCount: number;
  status: OrganizationStatus;
  activeSubscription?: ISubscriptionResponse;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrganizationDetailResponse {
  id: string;
  name: string;
  description: string;
  businessId: string;
  taxId: string;
  registrationNumberVAT: string;
  owner: IAuthUserBasicResponse;
  address: IAddress;
  status: OrganizationStatus;
  users: IAuthUserInfoResponse[];
  activeSubscription?: ISubscriptionDetailResponse;
  subscriptions?: ISubscriptionDetailResponse[];
  roles: IOrganizationRoleDetailResponse[];
  createdAt?: string;
  updatedAt?: string;
  packageId: string;
  packageName: string;
}

export interface IOrganizationEditRequest {
  id: string;
  info: IOrganizationInfo;
  address?: IAddress;
  packageId: string;
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}
