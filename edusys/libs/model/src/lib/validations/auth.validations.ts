import * as Joi from '@hapi/joi';
import { IAuthUserChangePasswordRequest, IAuthLoginUserRequest, IAuthCreatePasswordRequest } from '@edusys/model';

export const loginUserSchema = Joi.object({
  remember: Joi.bool().optional(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const createPasswordSchema = Joi.object<IAuthCreatePasswordRequest>({
  token: Joi.required(),
  password: Joi.string().min(6).required(),
}).options({ allowUnknown: true });

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const loginUserSchemaValidate = (data: IAuthLoginUserRequest): Joi.ValidationResult => loginUserSchema.validate(data);
export const changePasswordSchemaValidate = (data: IAuthUserChangePasswordRequest): Joi.ValidationResult => changePasswordSchema.validate(data);
export const createPasswordSchemaValidate = (data: IAuthCreatePasswordRequest): Joi.ValidationResult => createPasswordSchema.validate(data);
