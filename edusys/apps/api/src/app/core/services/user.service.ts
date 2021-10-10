import { IUserCreateRequest, IUserDetailResponse, IUserEditRequest, VerifyTokenType } from '@edusys/model';
import UserModel from '../models/user.model';
import { userDetailMapper, userListMapper } from '../mappers/user.mapper';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { createUserSchemaValidate, editUserSchemaValidate } from '@edusys/model';
import OrganizationModel from '../models/organization.model';
import { sendEmail } from './email.service';
import { EmailType } from '@edusys/email-sender';
import { logInfo } from '../utils/logger';
import { createVerificationToken, generateVerificationTokenURL } from './verify-token.service';

export const listOfUsers = async (): Promise<IUserDetailResponse[]> => {
  const listOfEntities = await UserModel.find();
  if (!listOfEntities) {
    throw new NotFound();
  }
  return userListMapper(listOfEntities);
};

// DETAIL OF USER
export const detailOfUser = async (id: string): Promise<IUserDetailResponse> => {
  const detailModel = await UserModel.findById(id).populate('roles').populate('organizations');
  if (!detailModel) {
    throw new NotFound();
  }
  return userDetailMapper(detailModel);
};

export const createUser = async (payload: IUserCreateRequest): Promise<IUserDetailResponse> => {
  const { error } = createUserSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingModel = await UserModel.findByEmail(payload.email);
  if (existingModel) {
    throw new BadRequest(errorLabels.EXISTING_USER);
  }

  const newModel = new UserModel({
    email: payload.email,
    name: payload.name,
    surname: payload.surname,
    phone: payload.phone,
    organizations: payload.organizations ? [...payload.organizations] : [],
    activeOrganization: payload.organizations ? payload.organizations[0] : null,
  });
  try {
    const savedModel = await newModel.save();
    for (let i = 0; i < payload.organizations?.length; i++) {
      const organizationId = payload.organizations[i];
      await OrganizationModel.addUserToOrganization(organizationId, savedModel._id);
    }
    const token = await createVerificationToken(VerifyTokenType.PASSWORD_CREATE, savedModel._id);
    const url = await generateVerificationTokenURL(token);
    if (payload.organizations?.length) {
      const organizations = await OrganizationModel.findByOrganizationIds(payload.organizations);
      sendEmail(EmailType.USER_ORGANIZATION_ADD, payload.email, { isNewUser: true, organizations: organizations?.map((o) => o.name), url });
    } else {
      sendEmail(EmailType.VERIFY_EMAIL, payload.email, { name: savedModel.fullname || savedModel.email, verifyTokenUrl: url });
    }

    logInfo(`[USER_SERVICE] user '${payload.email}' created with id '${savedModel._id}'`);
    return userDetailMapper(savedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT USER
export const editUser = async (payload: IUserEditRequest): Promise<IUserDetailResponse> => {
  const { error } = editUserSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedModel = await UserModel.findByIdAndUpdate(id, { $set: { ...payload } }, { new: true });
    for (let i = 0; i < payload.organizations?.length; i++) {
      const organizationId = payload.organizations[i];
      await OrganizationModel.addUserToOrganization(organizationId, updatedModel._id);
    }
    if (payload.organizations?.length) {
      // const organizations = await OrganizationModel.findByOrganizationIds(payload.organizations);
      // const url = `${process.env.CLIENT_APP_URL}/login`; // TODO
      // sendEmail(EmailType.USER_ORGANIZATION_ADD, payload.email, { isNewUser: true, organizations: organizations?.map((o) => o.name), url });
    }
    logInfo(`[USER_SERVICE] user '${payload.email}' edited`);
    return userDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE USER
export const deleteUser = async (id: string): Promise<void> => {
  try {
    const detailModel = await UserModel.findById(id);
    if (detailModel?.email === process.env.SU_EMAIL) {
      throw new BadRequest(errorLabels.ACCESS_DENIED);
    }
    await UserModel.findByIdAndDelete(id);
    logInfo(`[USER_SERVICE] user '${detailModel?.email}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
