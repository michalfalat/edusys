import { IAuthUserBasicResponse } from '@edusys/model';

export interface IOrganizationRoleCreateRequest {
  name: string;
  description: string;
  organizationId: string;
  permissions: string[];
}

export interface IOrganizationRoleResponse {
  id: string;
  name: string;
}

export interface IOrganizationRoleDetailResponse {
  id: string;
  name: string;
  description: string;
  organizationName: string;
  organizationId: string;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
  editable: boolean;
  status: OrganizationRoleStatus;
  users: IAuthUserBasicResponse[];
}

export interface IOrganizationRoleEditRequest {
  id: string;
  name?: string;
  description?: string;
  permissions: string[];
  status: OrganizationRoleStatus;
  users: string[];
}

export enum OrganizationRoleStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}
