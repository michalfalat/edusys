import * as Joi from '@hapi/joi';
import { IUserCreateRequest, IUserEditRequest } from '@edusys/model';

export const createUserSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string().min(2).optional().allow(null, ''),
  surname: Joi.string().min(2).optional().allow(null, ''),
  phone: Joi.string().min(2).optional().allow(null, ''),
  organizations: Joi.array().optional(),
});

export const editUserSchema = Joi.object().keys({
  id: Joi.required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string().min(2).optional().allow(null, ''),
  surname: Joi.string().min(2).optional().allow(null, ''),
  phone: Joi.string().min(2).optional().allow(null, ''),
  organizations: Joi.array().optional(),
});

// USER
export const createUserSchemaValidate = (data: IUserCreateRequest): Joi.ValidationResult => createUserSchema.validate(data);
export const editUserSchemaValidate = (data: IUserEditRequest): Joi.ValidationResult => editUserSchema.validate(data);
