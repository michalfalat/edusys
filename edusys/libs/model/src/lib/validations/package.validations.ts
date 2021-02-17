import * as Joi from '@hapi/joi';
import { IPackageCreateRequest, IPackageEditRequest } from '@edusys/model';

export const createPackageSchema = Joi.object<IPackageCreateRequest>({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(512).optional(),
  annumPrices: Joi.array().required(),
  installationPrices: Joi.array().required(),
  moduleIds: Joi.array().required(),
});

export const editPackageSchema = Joi.object<IPackageEditRequest>({
  id: Joi.required(),
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(512).optional(),
  enabled: Joi.boolean().optional(),
  annumPrices: Joi.array().required(),
  installationPrices: Joi.array().required(),
  moduleIds: Joi.array().required(),
});

export const createPackageSchemaValidate = (data: IPackageCreateRequest): Joi.ValidationResult => createPackageSchema.validate(data);
export const editPackageSchemaValidate = (data: IPackageEditRequest): Joi.ValidationResult => editPackageSchema.validate(data);
