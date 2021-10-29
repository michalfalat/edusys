import * as Joi from '@hapi/joi';
import { IAuthUserChangePasswordRequest, IAuthLoginUserRequest, IAuthCreatePasswordRequest, IAuthResetPasswordRequest } from '@edusys/model';

export const loginUserSchema = Joi.object({
  remember: Joi.bool().optional(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const createPasswordSchema = Joi.object<IAuthCreatePasswordRequest>({
  token: Joi.required(),
  password: Joi.string().min(6).required(),
}).options({ allowUnknown: true });

export const resetPasswordSchema = Joi.object<IAuthResetPasswordRequest>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export const changePasswordSchema = Joi.object<IAuthUserChangePasswordRequest>({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  newPasswordConfirm: Joi.string().min(6).valid(Joi.ref('newPassword')).messages({
    'any.only': 'Password must match',
  }),
});

export const loginUserSchemaValidate = (data: IAuthLoginUserRequest): Joi.ValidationResult => loginUserSchema.validate(data);
export const changePasswordSchemaValidate = (data: IAuthUserChangePasswordRequest): Joi.ValidationResult => changePasswordSchema.validate(data);
export const createPasswordSchemaValidate = (data: IAuthCreatePasswordRequest): Joi.ValidationResult => createPasswordSchema.validate(data);
export const resetPasswordSchemaValidate = (data: IAuthResetPasswordRequest): Joi.ValidationResult => resetPasswordSchema.validate(data);
