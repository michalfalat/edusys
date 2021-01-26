import { IUser } from '../entities/user.entity';
import { IAuthRegisterUserResponse, IAuthUserInfoResponse } from '@edusys/model';

export const userListMappper = (users: IUser[]): IAuthUserInfoResponse[] =>
  users?.map((user) => ({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
  }));

export const userDetailMappper = (user: IUser): IAuthUserInfoResponse => ({
  name: user.name,
  surname: user.surname,
  email: user.email,
  phone: user.phone,
  roles: user.roles,
  emailVerified: user.emailVerified,
  phoneVerified: user.phoneVerified,
});

export const userRegistrationMappper = (user: IUser, verificationNeeded: boolean): IAuthRegisterUserResponse => ({
  name: user.name,
  surname: user.surname,
  email: user.email,
  phone: user.phone,
  roles: user.roles,
  emailVerified: user.emailVerified,
  phoneVerified: user.phoneVerified,
  verificationNeeded,
});
