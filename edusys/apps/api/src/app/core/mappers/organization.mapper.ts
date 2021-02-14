import { IOrganizationDetailResponse, IOrganizationResponse } from '@edusys/model';
import { IOrganization } from '../entities/organization.entity';

export const organizationDetailMapper = (organization: IOrganization): IOrganizationDetailResponse => ({
  id: organization.id,
  name: organization.name,
  description: organization.description,
  status: organization.status,
  address: organization.address,
  businessId: organization.businessId,
  registrationNumberVAT: organization.registrationNumberVAT,
  taxId: organization.taxId,
  users: organization.users,
});

export const organizationListMapper = (organizations: IOrganization[]): IOrganizationResponse[] =>
  organizations?.map((organization) => ({
    id: organization.id,
    name: organization.name,
    status: organization.status,
    owner: organization.owner,
    userCount: organization.users?.length,
  }));
