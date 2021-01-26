import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import UserEntity, { IUser } from '../entities/user.entity';
import { changePasswordSchema, loginUserSchema, registerUserSchema } from '../validations/auth.validations';
import { BadRequest, NotFound } from '../utils/errors';
import * as jwt from 'jsonwebtoken';
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
import { EmailTemplate } from '@edusys/model';
import { sendEmail } from './email.service';
import VerifyTokenEntity, { IVerifyToken } from '../entities/verify-token.entity';

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
    throw new BadRequest(request.__('error.existingUser'));
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
      await sendVerifyEmail(request, response, savedUser);
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
    throw new BadRequest(request.__('error.invalidCredentials'));
  }

  if (verificationNeeded && !user.emailVerified) {
    throw new BadRequest(request.__('error.invalidCredentials'));
  }

  const validPassword = await compare(loginUser.password, user.password);
  if (!validPassword) {
    throw new BadRequest(request.__('error.invalidCredentials'));
  }

  const token = jwt.sign({ id: user._id, name: user.name, roles: user.roles }, process.env.TOKEN_SECRET);
  return { token };
};

// USER INFO
export const userInfo = async (request: Request, response: Response): Promise<IAuthUserInfoResponse> => {
  const token = response.locals.jwtToken;
  const user = await UserEntity.findOne({ _id: token.id });
  if (!user) {
    throw new NotFound(request.__('error.notFound'));
  }
  await sendVerifyEmail(request, response, user);
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
    throw new NotFound(request.__('error.notFound'));
  }

  const validPassword = await compare(changePasswordRequest.oldPassword, user.password);
  if (!validPassword) {
    throw new BadRequest(request.__('error.invalidCredentials'));
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(changePasswordRequest.newPassword, salt);

  await UserEntity.updateOne({ _id: token.id }, { $set: { password: hashedPassword } });

  return { success: true };
};

// LIST OF USERS
export const listOfUsers = async (request: Request, response: Response): Promise<IAuthUserInfoResponse[]> => {
  const users = await UserEntity.find();
  if (!users) {
    throw new NotFound(request.__('error.notFound'));
  }
  return userListMappper(users);
};

export const sendVerifyEmail = async (request: Request, response: Response, user: IUser): Promise<void> => {
  const verifyToken = new VerifyTokenEntity({
    expires: Date.now(),
    user: user._id,
    token: 'asdasd',
  });
  try {
    const savedToken = await verifyToken.save();

    // return userRegistrationMappper(savedUser, verificationNeeded);
  } catch (error) {
    throw new BadRequest(error);
  }

  const email: EmailTemplate<'verifyEmail'> = {
    template: 'verifyEmail',
    params: {
      name: user?.name?.length ? `${user.name} ${user.surname}` : user.email,
      verifyTokenUrl: `${request.headers.host}/sadasd`,
    },
    to: user.email,
    lang: request.getLocale(),
  };

  await sendEmail(email);
};
