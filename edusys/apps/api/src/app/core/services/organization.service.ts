import { IOrganizationCreateRequest, IOrganizationDetailResponse, IOrganizationResponse, IOrganizationEditRequest, OrganizationStatus } from '@edusys/model';
import OrganizationEntity from '../entities/organization.entity';
import { organizationDetailMapper, organizationListMapper } from '../mappers/organization.mapper';
import { BadRequest, NotFound } from '../utils/errors';
import { createOrganizationSchemaValidate, editOrganizationSchemaValidate } from '@edusys/model';
import { detailOfUser, getUserByEmail, register } from './auth.service';

// LIST OF ALL ORGANIZATIONS WITHOUT PAGINATION
export const listOfOrganizations = async (): Promise<IOrganizationResponse[]> => {
  const listOfEntities = await OrganizationEntity.find().populate('owner').populate('users').populate('organizationRole');
  if (!listOfEntities) {
    throw new NotFound();
  }
  return organizationListMapper(listOfEntities);
};

// DETAIL OF ORGANIZATION
export const detailOfOrganization = async (id: string): Promise<IOrganizationDetailResponse> => {
  const detailEntity = await OrganizationEntity.findById(id).populate('owner', ['email']).populate('users').populate('organizationRole');
  if (!detailEntity) {
    throw new NotFound();
  }
  return organizationDetailMapper(detailEntity);
};

// CREATE NEW ORGANIZATION
export const createOrganization = async (payload: IOrganizationCreateRequest): Promise<IOrganizationDetailResponse> => {
  const { error } = createOrganizationSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const ownerUser = await getUserByEmail(payload.owner.email); //  await register(payload.owner);

  const newEntity = new OrganizationEntity({
    name: payload.info.name,
    description: payload.info.description,
    businessId: payload.info.businessId,
    taxId: payload.info.taxId,
    registrationNumberVAT: payload.info.registrationNumberVAT,
    address: payload.address,
    owner: ownerUser.id,
    status: OrganizationStatus.ACTIVE,
    organizationRoles: [],
    users: [ownerUser?.id],
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
  const { error } = editOrganizationSchemaValidate(payload);
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
