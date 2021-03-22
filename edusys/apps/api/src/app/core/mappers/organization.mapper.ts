import { IOrganizationDetailResponse, IOrganizationResponse } from '@edusys/model';
import { IOrganization } from '../models/organization.model';
import { userListMappper, userDetailMappper } from './auth.mapper';
import { subscriptionMapper, subscriptionDetailMapper } from './subscription.mapper';

export const organizationDetailMapper = (data: IOrganization): IOrganizationDetailResponse => ({
  id: data._id,
  name: data.name,
  description: data.description,
  status: data.status,
  address: data.address,
  businessId: data.businessId,
  registrationNumberVAT: data.registrationNumberVAT,
  taxId: data.taxId,
  users: userListMappper(data.users),
  owner: !!data.owner ? userDetailMappper(data.owner) : null,
  activeSubscription: !!data.subscriptions ? subscriptionDetailMapper(data.subscriptions.find((s) => s.isActive)) : null,
  subscriptions: data.subscriptions?.map((s) => subscriptionDetailMapper(s)),
  roles: data.organizationRoles,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const organizationBasicMapper = (data: IOrganization): IOrganizationResponse => ({
  id: data._id,
  name: data.name,
  status: data.status,
  owner: !!data.owner ? userDetailMappper(data.owner) : null,
  userCount: data.users?.length,
  createdAt: data.createdAt,
  activeSubscription: !!data.subscriptions ? subscriptionDetailMapper(data.subscriptions?.find((s) => s.isActive)) : null,
});

export const organizationListMapper = (data: IOrganization[]): IOrganizationResponse[] =>
  data?.map((organization) => ({
    id: organization._id,
    name: organization.name,
    status: organization.status,
    owner: !!organization.owner ? userDetailMappper(organization.owner) : null,
    userCount: organization.users?.length,
    createdAt: organization.createdAt,
    activeSubscription: !!organization.subscriptions ? subscriptionMapper(organization.subscriptions.find((s) => s.isActive)) : null,
  }));
