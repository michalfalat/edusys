import { IAuthUserBasicResponse, IAuthUserInfoResponse } from './auth.model';
import { IAddress } from './common.model';

export interface IOrganizationCreateRequest {
  name: string;
  description: string;
  businessId?: string;
  taxId?: string;
  registrationNumberVAT?: string;
  address?: IAddress;
  owner: {
    email: string;
    name: string;
    surname: string;
  };
}

export interface IOrganizationResponse {
  id: string;
  name: string;
  owner: IAuthUserBasicResponse;
  userCount: number;
  status: OrganizationStatus;
}

export interface IOrganizationDetailResponse {
  id: string;
  name: string;
  description: string;
  businessId?: string;
  taxId?: string;
  registrationNumberVAT?: string;
  address?: IAddress;
  status: OrganizationStatus;
  users: IAuthUserInfoResponse[];
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
