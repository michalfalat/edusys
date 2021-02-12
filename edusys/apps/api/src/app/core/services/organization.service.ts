import { IOrganizationCreateRequest, IOrganizationDetailResponse, IOrganizationResponse, IOrganizationEditRequest } from '@edusys/model';
import OrganizationEntity from '../entities/organization.entity';
import { organizationDetailMapper, organizationListMapper } from '../mappers/organization.mapper';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { createOrganizationSchema, editOrganizationSchema } from '../validations/organization.validations';

// LIST OF ALL ORGANIZATIONS WITHOUT PAGINATION
export const listOfOrganizations = async (): Promise<IOrganizationResponse[]> => {
  const listOfEntities = await OrganizationEntity.find();
  if (!listOfEntities) {
    throw new NotFound();
  }
  return organizationListMapper(listOfEntities);
};

// DETAIL OF ORGANIZATION
export const detailOfOrganization = async (id: string): Promise<IOrganizationDetailResponse> => {
  const detailEntity = await OrganizationEntity.findById(id);
  if (!detailEntity) {
    throw new NotFound();
  }
  return organizationDetailMapper(detailEntity);
};

// CREATE NEW ORGANIZATION
export const createOrganization = async (payload: IOrganizationCreateRequest): Promise<IOrganizationDetailResponse> => {
  const { error } = createOrganizationSchema(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingEntity = await OrganizationEntity.findOne({ name: payload.name });
  if (!!existingEntity) {
    throw new BadRequest(errorLabels.EXISTING_NAME);
  }

  const newEntity = new OrganizationEntity({
    name: payload.name,
    description: payload.description,
  });
  try {
    const savedEntity = await newEntity.save();
    return organizationDetailMapper(savedEntity);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT ORGANIZATION
export const editOrganization = async (payload: IOrganizationEditRequest): Promise<IOrganizationDetailResponse> => {
  const { error } = editOrganizationSchema(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedEntity = await OrganizationEntity.findByIdAndUpdate(id, payload, { new: true });
    return organizationDetailMapper(updatedEntity);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE ORGANIZATION
export const deleteOrganization = async (id: string): Promise<void> => {
  try {
    await OrganizationEntity.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
