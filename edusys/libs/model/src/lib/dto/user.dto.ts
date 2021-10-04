import { IOrganizationDetailResponse, VerifyTokenType } from '@edusys/model';
import { IOrganizationRoleResponse } from './organization-role.dto';
import { IOrganizationResponse } from './organization.dto';

export interface IJWTUserData {
  id: string;
  name: string;
  organizationId?: string;
  email: string;
  iat?: number;
}

export interface IAuthLoginUserRequest {
  remember?: boolean;
  email: string;
  password: string;
}

export interface IAuthLoginUserResponse {
  token: string;
}

export interface IAuthVerificationTokenInfoRequest {
  token: string;
}

export interface IAuthVerificationTokenInfoResponse {
  id: string;
  token: string;
  expired: boolean;
  type: VerifyTokenType;
  email?: string;
}

export interface IAuthCreatePasswordRequest {
  token: string;
  password: string;
}

export interface IAuthInitDataResponse {
  activeOrganization?: IOrganizationDetailResponse;
  permissions: string[];
}

export interface IAuthUserInfoResponse {
  id: string;
  name: string;
  surname: string;
  fullname: string;
  email: string;
  phone: string;
  roles: IOrganizationRoleResponse[];
  organizations: IOrganizationResponse[];
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthUserBasicResponse {
  id: string;
  name: string;
  surname: string;
  fullname: string;
  email: string;
  phone: string;
}

export interface IAuthUserChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthUserChangePasswordResponse {
  success: boolean;
}

export interface IUserCreateRequest {
  email: string;
  name: string;
  surname: string;
  phone: string;
  organizations: string[];
}

export interface IUserEditRequest {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  organizations: string[];
}

export interface IUserDetailResponse {
  id: string;
  name: string;
  surname: string;
  fullname: string;
  email: string;
  phone: string;
  organizations: IOrganizationResponse[];
  roles: IOrganizationRoleResponse[];
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt: string;
}
