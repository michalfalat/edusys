import * as Joi from '@hapi/joi';
import { IAuthUserChangePasswordRequest, IAuthLoginUserRequest, IAuthRegisterUserRequest } from '@edusys/model';

export const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).optional().allow(null, ''),
  surname: Joi.string().min(2).optional().allow(null, ''),
});

export const loginUserSchema = Joi.object({
  remember: Joi.bool().optional(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const registerUserSchemaValidate = (data: IAuthRegisterUserRequest): Joi.ValidationResult => newUserSchema.validate(data);
export const loginUserSchemaValidate = (data: IAuthLoginUserRequest): Joi.ValidationResult => loginUserSchema.validate(data);
export const changePasswordSchemaValidate = (data: IAuthUserChangePasswordRequest): Joi.ValidationResult => changePasswordSchema.validate(data);
