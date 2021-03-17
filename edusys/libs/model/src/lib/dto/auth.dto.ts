import { IOrganizationRoleResponse } from './organization-role.dto';

export interface IJWTUserData {
  id: string;
  name: string;
  organizationId?: string;
  permissions: string[];
  iat?: number;
}

//LOGIN
export interface IAuthLoginUserRequest {
  remember?: boolean;
  email: string;
  password: string;
}

export interface IAuthLoginUserResponse {
  token: string;
}

// REGISTER
export interface IAuthRegisterUserRequest {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export interface IAuthRegisterUserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  roles: IOrganizationRoleResponse[];
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationNeeded: boolean;
}

// USER INFO
export interface IAuthUserInfoResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  roles: IOrganizationRoleResponse[];
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface IAuthUserBasicResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

// CHANGE PASSWORD
export interface IAuthUserChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthUserChangePasswordResponse {
  success: boolean;
}
