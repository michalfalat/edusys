export interface IModuleCreateRequest {
  name: string;
  description: string;
}
export interface IModuleDetailResponse {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface IModuleEditRequest {
  id: string;
  name?: string;
  description?: string;
  enabled?: boolean;
}
