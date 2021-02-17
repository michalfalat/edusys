import { compare, genSalt, hash } from 'bcrypt';
import UserEntity from '../entities/user.entity';
import { changePasswordSchemaValidate, loginUserSchemaValidate, registerUserSchemaValidate } from '@edusys/model';
import { BadRequest, NotFound } from '../utils/errors';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import { userDetailMappper, userListMappper, userRegistrationMappper } from '../mappers/auth.mapper';
import {
  IAuthUserChangePasswordRequest,
  IAuthUserChangePasswordResponse,
  IAuthLoginUserRequest,
  IAuthLoginUserResponse,
  IAuthRegisterUserRequest,
  IAuthRegisterUserResponse,
  IAuthUserInfoResponse,
  IJWTUserData,
  PERMISSION,
} from '@edusys/model';
import { errorLabels } from '../utils/error-labels';
import { sendVerifyEmail } from './email.service';
import VerifyTokenEntity from '../entities/verify-token.entity';
import { getCurrentUser } from '../middlewares/current-http-context';

// REGISTER
export const register = async (payload: IAuthRegisterUserRequest): Promise<IAuthRegisterUserResponse> => {
  const verificationNeeded = Boolean(JSON.parse(process.env.APP_EMAIL_VERIFICATION));
  const { error } = registerUserSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingUser = await UserEntity.findOne({ email: payload.email });
  if (!!existingUser) {
    throw new BadRequest(errorLabels.EXISTING_USER);
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(payload.password, salt);

  const user = new UserEntity({
    name: payload.name || '',
    surname: payload.surname,
    email: payload.email,
    password: hashedPassword,
    roles: [],
  });
  try {
    const savedUser = await user.save();
    if (verificationNeeded) {
      const verifyToken = new VerifyTokenEntity({
        expires: Date.now(),
        user: savedUser._id,
        token: uuid.v4(),
      });

      const savedToken = await verifyToken.save();
      await sendVerifyEmail(savedUser, savedToken);
    }
    return userRegistrationMappper(savedUser, verificationNeeded);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// LOGIN
export const login = async (payload: IAuthLoginUserRequest): Promise<IAuthLoginUserResponse> => {
  const verificationNeeded = Boolean(JSON.parse(process.env.APP_EMAIL_VERIFICATION));
  const { error } = loginUserSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const user = await UserEntity.findOne({ email: payload.email });
  if (!user) {
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }

  if (verificationNeeded && !user.emailVerified) {
    throw new BadRequest(errorLabels.VERIFICATION_NEEDED);
  }

  const validPassword = await compare(payload.password, user.password);
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
  const user = await UserEntity.findOne({ _id: jwtData?.id });
  if (!user) {
    throw new NotFound();
  }
  return userDetailMappper(user);
};

// CHANGE PASSWORD
export const changePassword = async (payload: IAuthUserChangePasswordRequest): Promise<IAuthUserChangePasswordResponse> => {
  const { error } = changePasswordSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  const jwtData = getCurrentUser();
  const user = await UserEntity.findOne({ _id: jwtData?.id }).select('+password');
  if (!user) {
    throw new NotFound();
  }

  const validPassword = await compare(payload.oldPassword, user.password);
  if (!validPassword) {
    throw new BadRequest(errorLabels.INVALID_CREDENTIALS);
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(payload.newPassword, salt);

  await UserEntity.updateOne({ _id: jwtData?.id }, { $set: { password: hashedPassword } });

  return { success: true };
};

// SU
export const seedSU = async (): Promise<void> => {
  const existingUser = await UserEntity.findOne({ email: process.env.SU_EMAIL });
  if (!!existingUser) {
    throw new BadRequest(errorLabels.EXISTING_USER_SU);
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(process.env.SU_PWD, salt);
  const user = new UserEntity({
    name: process.env.SU_NAME,
    email: process.env.SU_EMAIL,
    password: hashedPassword,
    roles: [],
    emailVerified: true,
  });
  await user.save();
};

// LIST OF USERS
export const listOfUsers = async (): Promise<IAuthUserInfoResponse[]> => {
  const listOfEntities = await UserEntity.find();
  if (!listOfEntities) {
    throw new NotFound();
  }
  return userListMappper(listOfEntities);
};

// DETAIL OF USER
export const detailOfUser = async (id: string): Promise<IAuthUserInfoResponse> => {
  const detailEntity = await UserEntity.findById(id);
  if (!detailEntity) {
    throw new NotFound();
  }
  return userDetailMappper(detailEntity);
};

export const getUserByEmail = async (email: string): Promise<IAuthUserInfoResponse> => {
  const detailEntity = await UserEntity.findOne({ email });
  if (!detailEntity) {
    throw new NotFound();
  }
  return userDetailMappper(detailEntity);
};
