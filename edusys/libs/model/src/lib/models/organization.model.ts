export interface IOrganizationCreateRequest {
  name: string;
  description: string;
}
export interface IOrganizationDetailResponse {
  id: string;
  name: string;
  description: string;
}

export interface IOrganizationEditRequest {
  id: string;
  name?: string;
  description?: string;
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}
