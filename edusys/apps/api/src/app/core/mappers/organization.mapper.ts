import { IOrganizationDetailResponse } from '@edusys/model';
import { IOrganization } from '../entities/organization.entity';

export const organizationDetailMapper = (organization: IOrganization): IOrganizationDetailResponse => ({
  id: organization.id,
  name: organization.name,
  description: organization.description,
});

export const organizationListMapper = (organizations: IOrganization[]): IOrganizationDetailResponse[] => organizations?.map((m) => organizationDetailMapper(m));
