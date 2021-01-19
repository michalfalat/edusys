export interface IAuthLoginUserRequest {
  email: string;
  password: string;
  remember: boolean;
}

export interface IAuthLoginUserResponse {
  token: string;
}

export interface IAuthRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IAuthRegisterUserResponse {
  verification: boolean;
}

export interface IAuthChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthForgotPasswordRequest {
  email: string;
}

export interface IAuthUserInfoResponse {
  name: string;
  surname: string;
  email: string;
}
