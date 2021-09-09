import { IOrganizationRoleDetailResponse } from '@edusys/model';
import { IOrganizationRole } from '../models/organization-role.model';

export const organizationRoleDetailMapper = (data: IOrganizationRole): IOrganizationRoleDetailResponse => ({
  id: data._id,
  name: data.name,
  description: data.description,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  organizationId: data.organization?._id,
  organizationName: data.organization?.name,
  permissions: data.permissions,
  editable: data.editable,
  status: data.status,
  users: data.users?.map((user) => ({
    id: user._id,
    name: user.name,
    surname: user.surname,
    fullname: user.fullname,
    organizations: [],
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
    createdAt: user.createdAt,
    passwordChangedAt: user.passwordChangedAt?.toISOString(),
  })),
});

export const organizationRoleListMapper = (role: IOrganizationRole[]): IOrganizationRoleDetailResponse[] =>
  role?.map((data) => ({
    id: data._id,
    name: data.name,
    description: data.description,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    organizationId: data.organization?._id,
    organizationName: data.organization?.name,
    permissions: data.permissions,
    editable: data.editable,
    status: data.status,
    users: data.users?.map((user) => ({
      id: user._id,
      name: user.name,
      surname: user.surname,
      fullname: user.fullname,
      organizations: [],
      email: user.email,
      phone: user.phone,
      roles: user.roles,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      createdAt: user.createdAt,
      passwordChangedAt: user.passwordChangedAt?.toISOString(),
    })),
  }));
