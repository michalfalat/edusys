import * as Joi from '@hapi/joi';
import { IOrganizationRoleCreateRequest, IOrganizationRoleEditRequest } from '@edusys/model';

export const createOrganizationRoleSchema = Joi.object<IOrganizationRoleCreateRequest>().keys({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).optional().allow(null, ''),
  organizationId: Joi.string().required(),
  permissions: Joi.array().optional(),
});

export const editOrganizationRoleSchema = Joi.object<IOrganizationRoleEditRequest>().keys({
  id: Joi.required(),
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).optional().allow(null, ''),
  permissions: Joi.array().optional(),
  status: Joi.string().required(),
});

// USER
export const createOrganizationRoleSchemaValidate = (data: IOrganizationRoleCreateRequest): Joi.ValidationResult => createOrganizationRoleSchema.validate(data);
export const editOrganizationRoleSchemaValidate = (data: IOrganizationRoleEditRequest): Joi.ValidationResult => editOrganizationRoleSchema.validate(data);
