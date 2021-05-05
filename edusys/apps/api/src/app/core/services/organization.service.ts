import {
  createOrganizationSchemaValidate,
  editOrganizationSchemaValidate,
  IOrganizationCreateRequest,
  IOrganizationDetailResponse,
  IOrganizationEditRequest,
  IOrganizationResponse,
  OrganizationRoleStatus,
  OrganizationStatus,
  SubscriptionStatus,
} from '@edusys/model';
import { flatten, uniq } from 'lodash';
import { organizationDetailMapper, organizationListMapper } from '../mappers/organization.mapper';
import { getCurrentUser } from '../middlewares/current-http-context';
import OrganizationRoleModel from '../models/organization-role.model';
import OrganizationModel from '../models/organization.model';
import PackageModel, { IPackage } from '../models/package.model';
import SubscriptionModel from '../models/subscription.model';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';

// LIST OF ALL ORGANIZATIONS WITHOUT PAGINATION
export const listOfOrganizations = async (): Promise<IOrganizationResponse[]> => {
  const listOfEntities = await OrganizationModel.find()
    .populate('owner')
    .populate('users')
    .populate('organizationRoles')
    .populate({ path: 'subscriptions', populate: { path: 'package' } });
  if (!listOfEntities) {
    throw new NotFound();
  }
  return organizationListMapper(listOfEntities);
};

// DETAIL OF ORGANIZATION
export const detailOfOrganization = async (id: string): Promise<IOrganizationDetailResponse> => {
  const detailModel = await OrganizationModel.findById(id)
    .populate('owner')
    .populate('users')
    .populate({ path: 'organizationRoles', populate: { path: 'users' } })
    .populate({ path: 'subscriptions', populate: { path: 'package' } });
  if (!detailModel) {
    throw new NotFound();
  }
  return organizationDetailMapper(detailModel);
};

// CREATE NEW ORGANIZATION
export const createOrganization = async (payload: IOrganizationCreateRequest): Promise<IOrganizationDetailResponse> => {
  const { error } = createOrganizationSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const pack = await PackageModel.findById(payload.packageId);
  if (!pack) {
    throw new NotFound();
  }

  try {
    const newModel = new OrganizationModel({
      name: payload.info.name,
      description: payload.info.description,
      businessId: payload.info.businessId,
      taxId: payload.info.taxId,
      registrationNumberVAT: payload.info.registrationNumberVAT,
      address: payload.address,
      owner: payload.info.owner,
      status: OrganizationStatus.ACTIVE,
      organizationRoles: [],
      users: [payload.info.owner],
    });
    let savedOrganization = await newModel.save();

    // sendOrganizationCreateEmail(ownerUser?.email, {
    //   loginUrl: `${process.env.APP_URL}/login`,
    //   name: ownerUser.fullName,
    //   organizationName: payload.info.name,
    // }); // TODO

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
    const permissions = await buildPermissions(payload.packageId);

    let ownerRole = new OrganizationRoleModel({
      name: 'ORGANIZATION_CREATOR',
      description: '',
      editable: false,
      organization: savedOrganization.id,
      createdBy: getCurrentUser()?.id,
      editedBy: getCurrentUser()?.id,
      status: OrganizationRoleStatus.ACTIVE,
      permissions,
      users: [payload.info.owner],
    });
    ownerRole = await ownerRole.save();

    savedOrganization = await OrganizationModel.findByIdAndUpdate(savedOrganization.id, { subscriptions: [savedSubscription], organizationRoles: [ownerRole] });

    logInfo(`[ORGANIZATION_SERVICE] organization created '${payload.info.name}' created with package '${pack.name}' `);

    return organizationDetailMapper(savedOrganization);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT ORGANIZATION
export const editOrganization = async (payload: IOrganizationEditRequest): Promise<IOrganizationDetailResponse> => {
  const { error } = editOrganizationSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    await OrganizationModel.findByIdAndUpdate(
      id,
      {
        name: payload.info.name,
        description: payload.info.description,
        address: payload.address,
        businessId: payload.info.businessId,
        registrationNumberVAT: payload.info.registrationNumberVAT,
        status: payload.info.status,
        taxId: payload.info.taxId,
      },
      { new: true },
    );
    logInfo(`[ORGANIZATION_SERVICE] organization '${payload.info?.name}' edited`);
    return detailOfOrganization(id);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE ORGANIZATION
export const deleteOrganization = async (id: string): Promise<void> => {
  try {
    await OrganizationModel.findByIdAndDelete(id);
    logInfo(`[ORGANIZATION_SERVICE] organization '${id}' deleted `);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};

export const getAvailablePermissions = async (id: string): Promise<string[]> => {
  try {
    const detailModel = await OrganizationModel.findById(id).populate({ path: 'subscriptions', populate: { path: 'package' } });
    if (!detailModel) {
      throw new NotFound();
    }
    const activeSubscription = detailModel?.subscriptions.find((s) => s.isActive);
    if (!activeSubscription) {
      return [];
    }
    return buildPermissions(activeSubscription.package._id);
  } catch (error) {
    throw new BadRequest(error);
  }
};

const buildPermissions = async (packageId: any): Promise<string[]> => {
  const pack: IPackage = await PackageModel.findById(packageId).populate('modules');
  const permissions = uniq(flatten([...pack?.modules?.map((mod) => mod?.permissions as string[])]));
  return permissions;
};
