// AUTHUSER ROLE
// export enum AuthUserRole {
//   SUPERADMIN = 'SUPERADMIN',
//   ADMIN = 'ADMIN',
//   FOUNDER = 'FOUNDER',
//   PRINCIPAL = 'PRINCIPAL',
//   TEACHER = 'TEACHER',
//   STUDENT = 'STUDENT',
//   ACCOUNTANT = 'ACCOUNTANT',
//   REPRESENTATIVE = 'REPRESENTATIVE',
//   EXTERNAL = 'EXTERNAL',
//   TERMINAL_USER = 'TERMINAL_USER',
//   OTHER = 'OTHER',
// }

import { IOrganizationRoleResponse } from './organization-role.model';

export interface IJWTUserData {
  id: string;
  name: string;
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
}

export interface IAuthRegisterUserResponse {
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
  name: string;
  surname: string;
  email: string;
  phone: string;
  roles: IOrganizationRoleResponse[];
  emailVerified: boolean;
  phoneVerified: boolean;
}

// CHANGE PASSWORD
export interface IAuthUserChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthUserChangePasswordResponse {
  success: boolean;
}
