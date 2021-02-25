import {
  IOrganizationCreateRequest,
  IOrganizationDetailResponse,
  IOrganizationResponse,
  IOrganizationEditRequest,
  OrganizationStatus,
  SubscriptionStatus,
  OrganizationRoleStatus,
  PERMISSION,
} from '@edusys/model';
import OrganizationModel from '../models/organization.model';
import { organizationDetailMapper, organizationListMapper } from '../mappers/organization.mapper';
import { BadRequest, NotFound } from '../utils/errors';
import { createOrganizationSchemaValidate, editOrganizationSchemaValidate } from '@edusys/model';
import { detailOfUser, register } from './auth.service';
import SubscriptionModel from '../models/subscription.model';
import PackageModel from '../models/package.model';
import OrganizationRoleModel from '../models/organization-role.model';
import { getCurrentUser } from '../middlewares/current-http-context';
import UserModel from '../models/user.model';
import { sendOrganizationCreateEmail } from './email.service';

// LIST OF ALL ORGANIZATIONS WITHOUT PAGINATION
export const listOfOrganizations = async (): Promise<IOrganizationResponse[]> => {
  const listOfEntities = await OrganizationModel.find().populate('owner').populate('users').populate('organizationRoles').populate('organizationRole');
  if (!listOfEntities) {
    throw new NotFound();
  }
  return organizationListMapper(listOfEntities);
};

// DETAIL OF ORGANIZATION
export const detailOfOrganization = async (id: string): Promise<IOrganizationDetailResponse> => {
  const detailModel = await OrganizationModel.findById(id)
    .populate('owner', ['email'])
    .populate('users')
    .populate({ path: 'organizationRoles', populate: { path: 'users' } })
    .populate({ path: 'subscriptions', populate: { path: 'package' } })
    .populate('organizationRole');
  if (!detailModel) {
    throw new NotFound();
  }
  return organizationDetailMapper(detailModel);
};

// CREATE NEW ORGANIZATION
export const createOrganization = async (payload: IOrganizationCreateRequest): Promise<IOrganizationDetailResponse> => {
  const { error } = createOrganizationSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const pack = await PackageModel.findById(payload.packageId);
  if (!pack) {
    throw new NotFound();
  }

  try {
    const ownerUser = await UserModel.findByEmail(payload.owner.email); //  await register(payload.owner);
    if (!!ownerUser) {
      sendOrganizationCreateEmail(ownerUser?.email, {
        loginUrl: `${process.env.APP_URL}/login`,
        name: ownerUser.fullName,
        organizationName: payload.info.name,
      });
    }

    const newModel = new OrganizationModel({
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
    let savedOrganization = await newModel.save();

    const subscriptionExpiration = new Date();
    subscriptionExpiration.setFullYear(subscriptionExpiration.getFullYear() + 1);

    const subscription = new SubscriptionModel({
      name: `${pack?.name} - subscription`,
      description: `${pack?.description}`,
      organization: savedOrganization.id,
      package: payload.packageId,
      reference: '',
      status: SubscriptionStatus.DEMO,
      validUntil: subscriptionExpiration,
      discount: null,
      discountPercentage: 0,
      finalPrice: pack?.annumPrices.find((p) => p.currency === process.env.PRIMARY_CURRENCY),
      isActive: true,
    });
    const savedSubscription = await subscription.save();

    let ownerRole = new OrganizationRoleModel({
      name: 'ORGANIZATION_CREATOR',
      description: '',
      editable: false,
      organization: savedOrganization.id,
      createdBy: getCurrentUser()?.id,
      editedBy: getCurrentUser()?.id,
      status: OrganizationRoleStatus.ACTIVE,
      permissions: [PERMISSION.USER.BASIC], // TODO  improve permissions based on package.modules..
      users: [ownerUser.id],
    });
    ownerRole = await ownerRole.save();

    savedOrganization = await OrganizationModel.findByIdAndUpdate(savedOrganization.id, { subscriptions: [savedSubscription], organizationRoles: [ownerRole] });

    return organizationDetailMapper(savedOrganization);
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
    const updatedModel = await OrganizationModel.findByIdAndUpdate(id, payload, { new: true });
    return organizationDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE ORGANIZATION
export const deleteOrganization = async (id: string): Promise<void> => {
  try {
    await OrganizationModel.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
