import * as Joi from '@hapi/joi';
import { IAuthUserChangePasswordRequest, IAuthLoginUserRequest, IAuthRegisterUserRequest } from '@edusys/model';

export const registerUserSchema = (data: IAuthRegisterUserRequest): Joi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).optional().allow(null, ''),
  });
  return schema.validate(data);
};

export const loginUserSchema = (data: IAuthLoginUserRequest): Joi.ValidationResult => {
  const schema = Joi.object({
    remember: Joi.bool().optional(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

export const changePasswordSchema = (data: IAuthUserChangePasswordRequest): Joi.ValidationResult => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
