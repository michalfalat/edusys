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
