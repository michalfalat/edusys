export interface IOrganizationRoleCreateRequest {
  name: string;
  description: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrganizationRoleEditRequest {
  id: string;
  name?: string;
  description?: string;
}

export enum OrganizationRoleStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}
