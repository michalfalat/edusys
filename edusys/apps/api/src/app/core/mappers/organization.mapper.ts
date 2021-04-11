import { IOrganizationDetailResponse, IOrganizationResponse } from '@edusys/model';
import { IOrganization } from '../models/organization.model';
import { userListMapper, userDetailMapper } from './user.mapper';
import { subscriptionMapper, subscriptionDetailMapper } from './subscription.mapper';
import { organizationRoleListMapper } from './organization-role.mapper';

export const organizationDetailMapper = (data: IOrganization): IOrganizationDetailResponse => ({
  id: data._id,
  name: data.name,
  description: data.description,
  status: data.status,
  address: data.address,
  businessId: data.businessId,
  registrationNumberVAT: data.registrationNumberVAT,
  taxId: data.taxId,
  users: userListMapper(data.users),
  owner: !!data.owner ? userDetailMapper(data.owner) : null,
  activeSubscription: !!data.subscriptions ? subscriptionDetailMapper(data.subscriptions.find((s) => s.isActive)) : null,
  subscriptions: data.subscriptions?.map((s) => subscriptionDetailMapper(s)),
  roles: organizationRoleListMapper(data.organizationRoles),
  packageId: data.subscriptions.find((s) => s.isActive)?.package?.id,
  packageName: data.subscriptions.find((s) => s.isActive)?.package?.name,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const organizationBasicMapper = (data: IOrganization): IOrganizationResponse => ({
  id: data._id,
  name: data.name,
  status: data.status,
  owner: !!data.owner ? userDetailMapper(data.owner) : null,
  userCount: data.users?.length,
  createdAt: data.createdAt,
  activeSubscription: !!data.subscriptions ? subscriptionDetailMapper(data.subscriptions?.find((s) => s.isActive)) : null,
});

export const organizationListMapper = (data: IOrganization[]): IOrganizationResponse[] =>
  data?.map((organization) => ({
    id: organization._id,
    name: organization.name,
    status: organization.status,
    owner: !!organization.owner ? userDetailMapper(organization.owner) : null,
    userCount: organization.users?.length,
    createdAt: organization.createdAt,
    activeSubscription: !!organization.subscriptions ? subscriptionMapper(organization.subscriptions.find((s) => s.isActive)) : null,
  }));
