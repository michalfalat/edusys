import { IUser } from '../models/user.model';
import { IAuthRegisterUserResponse, IAuthUserInfoResponse } from '@edusys/model';

export const userListMappper = (users: IUser[]): IAuthUserInfoResponse[] =>
  users?.map((user) => ({
    id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
  }));

export const userDetailMappper = (user: IUser): IAuthUserInfoResponse => ({
  id: user._id,
  name: user.name,
  surname: user.surname,
  email: user.email,
  phone: user.phone,
  roles: user.roles,
  emailVerified: user.emailVerified,
  phoneVerified: user.phoneVerified,
});

export const userRegistrationMappper = (user: IUser, verificationNeeded: boolean): IAuthRegisterUserResponse => ({
  id: user._id,
  name: user.name,
  surname: user.surname,
  email: user.email,
  phone: user.phone,
  roles: user.roles,
  emailVerified: user.emailVerified,
  phoneVerified: user.phoneVerified,
  verificationNeeded,
});
