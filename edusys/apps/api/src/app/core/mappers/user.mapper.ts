import { IUser } from '../models/user.model';
import { IUserDetailResponse } from '@edusys/model';
import { organizationBasicMapper } from './organization.mapper';

export const userListMapper = (data: IUser[]): IUserDetailResponse[] =>
  data?.map((user) => ({
    id: user._id,
    name: user.name,
    surname: user.surname,
    fullname: user.fullname,
    organizations: !!user.organizations ? user.organizations.map((o) => organizationBasicMapper(o)) : [],
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
    createdAt: user.createdAt,
    passwordChangedAt: user.passwordChangedAt?.toISOString(),
  }));

export const userDetailMapper = (data: IUser): IUserDetailResponse => ({
  id: data._id,
  name: data.name,
  surname: data.surname,
  fullname: data.fullname,
  organizations: !!data.organizations ? data.organizations.map((o) => organizationBasicMapper(o)) : [],
  email: data.email,
  phone: data.phone,
  roles: [] || data.roles,
  emailVerified: data.emailVerified,
  phoneVerified: data.phoneVerified,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  passwordChangedAt: data.passwordChangedAt?.toISOString(),
});
