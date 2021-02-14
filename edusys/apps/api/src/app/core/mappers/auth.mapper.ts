import { IUser } from '../entities/user.entity';
import { IAuthRegisterUserResponse, IAuthUserInfoResponse } from '@edusys/model';

export const userListMappper = (users: IUser[]): IAuthUserInfoResponse[] =>
  users?.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
  }));

export const userDetailMappper = (user: IUser): IAuthUserInfoResponse => ({
  id: user.id,
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
