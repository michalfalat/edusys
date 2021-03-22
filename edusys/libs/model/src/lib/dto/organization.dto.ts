import { IAuthUserBasicResponse, IAuthUserInfoResponse } from './auth.dto';
import { IAddress } from './common.dto';
import { ISubscriptionResponse, ISubscriptionDetailResponse } from './subscription.dto';

export interface IOrganizationCreateRequest {
  info: {
    name: string;
    description: string;
    businessId?: string;
    taxId?: string;
    registrationNumberVAT?: string;
  };
  address?: IAddress;
  owner: {
    email: string;
    name: string;
    surname: string;
    password: string;
  };
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
  roles: any; // TODO
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrganizationEditRequest {
  id: string;
  name?: string;
  description?: string;
  businessId?: string;
  taxId?: string;
  registrationNumberVAT?: string;
  address?: IAddress;
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}
