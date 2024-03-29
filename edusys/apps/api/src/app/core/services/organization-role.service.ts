import {
  createOrganizationRoleSchemaValidate,
  editOrganizationRoleSchemaValidate,
  IOrganizationRoleCreateRequest,
  IOrganizationRoleDetailResponse,
  IOrganizationRoleEditRequest,
  OrganizationRoleStatus,
} from '@edusys/model';
import { organizationRoleDetailMapper, organizationRoleListMapper } from '../mappers/organization-role.mapper';
import { getCurrentUser } from '../middlewares/current-http-context';
import OrganizationRoleModel from '../models/organization-role.model';
import OrganizationModel from '../models/organization.model';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';

export const listOfOrganizationRoles = async (): Promise<IOrganizationRoleDetailResponse[]> => {
  const listOfEntities = await OrganizationRoleModel.find().populate('organization');
  if (!listOfEntities) {
    throw new NotFound();
  }
  return organizationRoleListMapper(listOfEntities);
};

// DETAIL OF ORGANIZATION_ROLE
export const detailOfOrganizationRole = async (id: string): Promise<IOrganizationRoleDetailResponse> => {
  const detailModel = await OrganizationRoleModel.findById(id).populate('organization').populate('users');
  if (!detailModel) {
    throw new NotFound();
  }
  return organizationRoleDetailMapper(detailModel);
};

export const createOrganizationRole = async (payload: IOrganizationRoleCreateRequest): Promise<IOrganizationRoleDetailResponse> => {
  const { error } = createOrganizationRoleSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  try {
    let newModel = new OrganizationRoleModel({
      name: payload.name,
      description: payload.description,
      editable: true,
      organization: payload.organizationId,
      createdBy: getCurrentUser()?.id,
      editedBy: getCurrentUser()?.id,
      status: OrganizationRoleStatus.ACTIVE,
      permissions: payload.permissions,
      users: [],
    });
    newModel = await newModel.save();
    await OrganizationModel.addRoleToOrganization(payload.organizationId, newModel._id);
    logInfo(`[ORGANIZATION_ROLE_SERVICE] role '${payload.name}' created`);
    return organizationRoleDetailMapper(newModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT ORGANIZATION_ROLE
export const editOrganizationRole = async (payload: IOrganizationRoleEditRequest): Promise<IOrganizationRoleDetailResponse> => {
  const { error } = editOrganizationRoleSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedModel = await OrganizationRoleModel.findByIdAndUpdate(id, { $set: { ...payload } }, { new: true });
    logInfo(`[ORGANIZATION_ROLE_SERVICE] role '${payload.name}' edited`);
    return organizationRoleDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE ORGANIZATION_ROLE
export const deleteOrganizationRole = async (id: string): Promise<void> => {
  try {
    await OrganizationRoleModel.findByIdAndDelete(id);
    logInfo(`[ORGANIZATION_ROLE_SERVICE] role '${id}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
