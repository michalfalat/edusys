import { IOrganizationDetailResponse, IOrganizationResponse } from '@edusys/model';
import { IOrganization } from '../models/organization.model';
import { userListMappper, userDetailMappper } from './auth.mapper';
import { subscriptionMapper, subscriptionDetailMapper } from './subscription.mapper';

export const organizationDetailMapper = (organization: IOrganization): IOrganizationDetailResponse => ({
  id: organization._id,
  name: organization.name,
  description: organization.description,
  status: organization.status,
  address: organization.address,
  businessId: organization.businessId,
  registrationNumberVAT: organization.registrationNumberVAT,
  taxId: organization.taxId,
  users: userListMappper(organization.users),
  owner: userDetailMappper(organization.owner),
  activeSubscription: subscriptionDetailMapper(organization.subscriptions.find((s) => s.isActive)),
  subscriptions: organization.subscriptions.map((s) => subscriptionDetailMapper(s)),
  roles: organization.organizationRoles,
});

export const organizationListMapper = (organizations: IOrganization[]): IOrganizationResponse[] =>
  organizations?.map((organization) => ({
    id: organization._id,
    name: organization.name,
    status: organization.status,
    owner: organization.owner,
    userCount: organization.users?.length,
    activeSubscription: subscriptionMapper(organization.subscriptions.find((s) => s.isActive)),
  }));
