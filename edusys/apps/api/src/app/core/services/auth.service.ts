import {
  changePasswordSchemaValidate,
  createPasswordSchemaValidate,
  IAuthCreatePasswordRequest,
  IAuthInitDataResponse,
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
  IAuthResetPasswordRequest,
  IAuthUserChangePasswordRequest,
  IAuthUserChangePasswordResponse,
  IAuthUserInfoResponse,
  IJWTUserData,
  loginUserSchemaValidate,
  PERMISSION,
  resetPasswordSchemaValidate,
  VerifyTokenType,
} from '@edusys/model';
import * as jwt from 'jsonwebtoken';
import { organizationDetailMapper } from '../mappers/organization.mapper';
import { userDetailMapper } from '../mappers/user.mapper';
import { getCurrentUser } from '../middlewares/current-http-context';
import UserModel from '../models/user.model';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { logError, logInfo } from '../utils/logger';
import { createVerificationToken, deleteToken, generateVerificationTokenURL, verificationTokenInfo } from './verify-token.service';
import { flatten, uniq } from 'lodash';
import { EmailType } from '@edusys/email-sender';
import { sendEmail } from './email.service';

// // REGISTER
// export const register = async (payload: IAuthRegisterUserRequest): Promise<IAuthRegisterUserResponse> => {
//   const verificationNeeded = Boolean(JSON.parse(process.env.APP_EMAIL_VERIFICATION));
//   const { error } = registerUserSchemaValidate(payload);
//   if (!!error) {
//     throw new BadRequest(error.details[0].message);
//   }

//   const existingUser = await UserModel.findByEmail(payload.email);
//   if (!!existingUser) {
//     throw new BadRequest(errorLabels.EXISTING_USER);
//   }

//   const user = new UserModel({
//     name: payload.name || '',
//     surname: payload.surname,
//     email: payload.email,
//     password: payload.password,
//     roles: [],
//   });
//   try {
//     const savedUser = await user.save();
//     if (verificationNeeded) {
//       let verifyToken = new VerifyTokenModel({
//         expires: Date.now(),
//         user: savedUser._id,
//         token: uuid.v4(),
//       });

//       verifyToken = await verifyToken.save();
//       await sendVerifyEmail(savedUser?.email, {
//         name: savedUser.fullName,
//         verifyTokenUrl: `${process.env.APP_URL}/auth/verify?${verifyToken?.token}`,
//       });
//     }
//     return userRegistrationMappper(savedUser, verificationNeeded);
//   } catch (error) {
//     throw new BadRequest(error);
//   }
// };

// LOGIN
export const login = async (payload: IAuthLoginUserRequest): Promise<IAuthLoginUserResponse> => {
  const verificationNeeded = Boolean(JSON.parse(process.env.APP_EMAIL_VERIFICATION));
  const { error } = loginUserSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const user = await UserModel.findByEmail(payload.email).select('+password');
  if (!user) {
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }

  if (verificationNeeded && !user.emailVerified) {
    throw new BadRequest(errorLabels.VERIFICATION_NEEDED);
  }
  const validPassword = await user.comparePassword(payload.password);
  if (!validPassword) {
    logError(`[AUTH_SERVICE] user ${user.email} tried to login with invalid credentials`);
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }

  const jwtData: IJWTUserData = {
    id: user._id,
    name: user.fullname,
    email: user.email,
  };

  const token = jwt.sign(jwtData, process.env.TOKEN_SECRET);
  logInfo(`[AUTH_SERVICE] user ${user.email} logged in successfully`);
  return { token };
};

// USER INFO
export const userInfo = async (): Promise<IAuthUserInfoResponse> => {
  const jwtData = getCurrentUser();
  const user = await UserModel.findById(jwtData?.id).populate('organizations');
  if (!user) {
    throw new NotFound();
  }
  return userDetailMapper(user);
};

// INIT DATA
export const initData = async (): Promise<IAuthInitDataResponse> => {
  const jwtData = getCurrentUser();
  const user = await UserModel.findById(jwtData?.id).populate({ path: 'activeOrganization', populate: { path: 'organizationRoles', populate: 'users' } });
  if (!user) {
    return { permissions: [] };
  }

  if (!user.activeOrganization && user.organizations?.length > 0) {
    user.activeOrganization = user.organizations[0]._id;
    user.save();
  }

  const activeOrganization = organizationDetailMapper(user.activeOrganization);
  const userRoles = user.activeOrganization?.organizationRoles?.filter((r) => r.users?.map((u) => u.id).includes(user.id));
  const permissions: string[] = uniq(flatten(userRoles.map((r) => r.permissions)));

  if (user.email === process.env.SU_EMAIL) {
    permissions.push(PERMISSION.SUPER_USER);
  }

  // TODO
  return {
    permissions,
    activeOrganization,
  };
};

// CHANGE PASSWORD
export const changePassword = async (payload: IAuthUserChangePasswordRequest): Promise<IAuthUserChangePasswordResponse> => {
  const { error } = changePasswordSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  const jwtData = getCurrentUser();
  const user = await UserModel.findById(jwtData?.id).select('+password');
  if (!user) {
    throw new NotFound();
  }

  const validPassword = await user.comparePassword(payload.oldPassword);
  if (!validPassword) {
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }
  user.password = payload.newPassword;
  await user.save();
  logInfo(`[AUTH_SERVICE] user ${user.email} changed password successfully`);

  return { success: true };
};

// CREATE  PASSWORD
export const createPassword = async (payload: IAuthCreatePasswordRequest): Promise<void> => {
  const { error } = createPasswordSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  const token = await verificationTokenInfo({ token: payload.token });
  if (!token) {
    throw new NotFound();
  }
  if (token.expired) {
    throw new BadRequest(errorLabels.EXPIRED_TOKEN);
  }
  const user = await UserModel.findByEmail(token.email);
  if (!user) {
    throw new NotFound();
  }
  user.password = payload.password;
  user.emailVerified = true;
  await user.save();
  await deleteToken(token.id);

  logInfo(`[AUTH_SERVICE] user ${user.email} created password successfully`);

  return;
};

// RESET  PASSWORD
export const resetPassword = async (payload: IAuthResetPasswordRequest): Promise<void> => {
  const { error } = resetPasswordSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const user = await UserModel.findByEmail(payload.email);
  if (!user) {
    throw new NotFound();
  }

  const token = await createVerificationToken(VerifyTokenType.PASSWORD_RESET, user._id);
  const url = await generateVerificationTokenURL(token);
  sendEmail(EmailType.RESET_PASSWORD, payload.email, { name: user.fullname || user.email, url });

  logInfo(`[AUTH_SERVICE] user ${user.email} reset password request`);

  return;
};

// SU //TODO move to separate file
export const seedSU = async (): Promise<void> => {
  const existingUser = await UserModel.findByEmail(process.env.SU_EMAIL);
  if (!!existingUser) {
    throw new BadRequest(errorLabels.EXISTING_USER_SU);
  }

  const user = new UserModel({
    name: process.env.SU_NAME,
    email: process.env.SU_EMAIL,
    password: process.env.SU_PWD,
    roles: [],
    emailVerified: true,
  });
  await user.save();
  logInfo(`[AUTH_SERVICE] data seed success`);
};
