export interface IModuleCreateRequest {
  name: string;
  description: string;
  permissions: string[];
}
export interface IModuleDetailResponse {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IModuleEditRequest {
  id: string;
  name?: string;
  description?: string;
  permissions: string[];
  enabled?: boolean;
}
