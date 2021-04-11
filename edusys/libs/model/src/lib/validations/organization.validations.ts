import * as Joi from '@hapi/joi';
import { IOrganizationCreateRequest } from '@edusys/model';
import { addressSchema } from './common.validations';
import { IOrganizationEditRequest } from '../dto/organization.dto';

export const createOrganizationInfoSchema = Joi.object({
  owner: Joi.required(),
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().optional().max(512).allow(null, ''),
  businessId: Joi.string().optional().max(128).allow(null, ''),
  taxId: Joi.string().optional().max(128).allow(null, ''),
  registrationNumberVAT: Joi.string().optional().max(128).allow(null, ''),
});

export const createOrganizationSchema = Joi.object<IOrganizationCreateRequest>({
  info: createOrganizationInfoSchema.required(),
  address: addressSchema.optional(),
  packageId: Joi.string().required(),
});

export const editOrganizationSchema = Joi.object<IOrganizationEditRequest>({
  id: Joi.required(),
  info: createOrganizationInfoSchema.required(),
  address: addressSchema.optional(),
  packageId: Joi.string().required(),
});

export const createOrganizationSchemaValidate = (data: IOrganizationCreateRequest): Joi.ValidationResult => createOrganizationSchema.validate(data);
export const editOrganizationSchemaValidate = (data: IOrganizationEditRequest): Joi.ValidationResult => editOrganizationSchema.validate(data);
