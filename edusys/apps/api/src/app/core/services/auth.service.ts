import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import UserEntity from '../entities/user.entity';
import { changePasswordSchema, loginUserSchema, registerUserSchema } from '../validations/auth.validations';
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
  AuthUserRole,
} from '@edusys/model';
import { errorLabels } from '../utils/error-labels';
import { sendVerifyEmail } from './email.service';
import VerifyTokenEntity from '../entities/verify-token.entity';

// REGISTER
export const register = async (request: Request, response: Response): Promise<IAuthRegisterUserResponse> => {
  const registerUser: IAuthRegisterUserRequest = request.body;
  const verificationNeeded = Boolean(process.env.APP_EMAIL_VERIFICATION);
  const { error } = registerUserSchema(registerUser);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingUser = await UserEntity.findOne({ email: registerUser.email });
  if (!!existingUser) {
    throw new BadRequest(request.__(errorLabels.EXISTING_USER));
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(registerUser.password, salt);

  const user = new UserEntity({
    name: registerUser.name || '',
    email: registerUser.email,
    password: hashedPassword,
    roles: [AuthUserRole.OTHER],
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
      await sendVerifyEmail(request, response, savedUser, savedToken);
    }
    return userRegistrationMappper(savedUser, verificationNeeded);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// LOGIN
export const login = async (request: Request, response: Response): Promise<IAuthLoginUserResponse> => {
  const loginUser: IAuthLoginUserRequest = request.body;
  const verificationNeeded = Boolean(process.env.APP_EMAIL_VERIFICATION);
  const { error } = loginUserSchema(loginUser);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const user = await UserEntity.findOne({ email: loginUser.email });
  if (!user) {
    throw new BadRequest(request.__(errorLabels.INVALID_CREDENTIALS));
  }

  if (verificationNeeded && !user.emailVerified) {
    throw new BadRequest(request.__(errorLabels.INVALID_CREDENTIALS));
  }

  const validPassword = await compare(loginUser.password, user.password);
  if (!validPassword) {
    throw new BadRequest(request.__(errorLabels.INVALID_CREDENTIALS));
  }

  const token = jwt.sign({ id: user._id, name: user.name, roles: user.roles }, process.env.TOKEN_SECRET);
  return { token };
};

// USER INFO
export const userInfo = async (request: Request, response: Response): Promise<IAuthUserInfoResponse> => {
  const token = response.locals.jwtToken;
  const user = await UserEntity.findOne({ _id: token.id });
  if (!user) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }
  return userDetailMappper(user);
};

// CHANGE PASSWORD
export const changePassword = async (request: Request, response: Response): Promise<IAuthUserChangePasswordResponse> => {
  const changePasswordRequest: IAuthUserChangePasswordRequest = request.body;
  const { error } = changePasswordSchema(changePasswordRequest);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  const token = response.locals.jwtToken;
  const user = await UserEntity.findOne({ _id: token.id });
  if (!user) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }

  const validPassword = await compare(changePasswordRequest.oldPassword, user.password);
  if (!validPassword) {
    throw new BadRequest(request.__(errorLabels.INVALID_CREDENTIALS));
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(changePasswordRequest.newPassword, salt);

  await UserEntity.updateOne({ _id: token.id }, { $set: { password: hashedPassword } });

  return { success: true };
};

// SU
export const seedSU = async (request: Request, response: Response): Promise<void> => {
  const existingUser = await UserEntity.findOne({ email: process.env.SU_EMAIL });
  if (!!existingUser) {
    throw new BadRequest(request.__(errorLabels.EXISTING_USER_SU));
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(process.env.SU_PWD, salt);
  const user = new UserEntity({
    name: process.env.SU_NAME,
    email: process.env.SU_EMAIL,
    password: hashedPassword,
    roles: [AuthUserRole.SUPERADMIN],
  });
  await user.save();
};

// LIST OF USERS
export const listOfUsers = async (request: Request, response: Response): Promise<IAuthUserInfoResponse[]> => {
  const users = await UserEntity.find();
  if (!users) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }
  return userListMappper(users);
};
