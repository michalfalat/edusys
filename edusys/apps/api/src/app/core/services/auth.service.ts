import UserModel from '../models/user.model';
import { changePasswordSchemaValidate, loginUserSchemaValidate } from '@edusys/model';
import { BadRequest, NotFound } from '../utils/errors';
import * as jwt from 'jsonwebtoken';
import { userDetailMapper } from '../mappers/user.mapper';
import {
  IAuthUserChangePasswordRequest,
  IAuthUserChangePasswordResponse,
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
  IAuthUserInfoResponse,
  IJWTUserData,
  PERMISSION,
} from '@edusys/model';
import { errorLabels } from '../utils/error-labels';
import { getCurrentUser } from '../middlewares/current-http-context';

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

  const user = await UserModel.findByEmail(payload.email);
  if (!user) {
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }

  if (verificationNeeded && !user.emailVerified) {
    throw new BadRequest(errorLabels.VERIFICATION_NEEDED);
  }

  const validPassword = await user.comparePassword(payload.password);
  if (!validPassword) {
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }

  const permissions = [];
  if (user.email === process.env.SU_EMAIL) {
    permissions.push(PERMISSION.SUPER_USER);
  }

  const jwtData: IJWTUserData = {
    id: user._id,
    name: user.name,
    permissions,
  };

  const token = jwt.sign(jwtData, process.env.TOKEN_SECRET);
  return { token };
};

// USER INFO
export const userInfo = async (): Promise<IAuthUserInfoResponse> => {
  const jwtData = getCurrentUser();
  const user = await UserModel.findById(jwtData?.id);
  if (!user) {
    throw new NotFound();
  }
  return userDetailMapper(user);
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
  await UserModel.updateOne({ _id: jwtData?.id }, { $set: { password: payload.newPassword } });

  return { success: true };
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
};
