import * as Joi from '@hapi/joi';
import { IIdentifierCreateRequest, IIdentifierEditRequest } from '@edusys/model';

export const createIdentifierSchema = Joi.object<IIdentifierCreateRequest>({
  number: Joi.string().min(2).max(255).required(),
  organizationId: Joi.string().required(),
  type: Joi.string().required(),
  userId: Joi.string().required(),
  validUntil: Joi.optional(),
});

export const editIdentifierSchema = Joi.object<IIdentifierEditRequest>({
  id: Joi.required(),
  number: Joi.string().min(2).max(255).required(),
  organizationId: Joi.required(),
  status: Joi.required(),
  type: Joi.required(),
  userId: Joi.required(),
  validUntil: Joi.optional(),
}).options({ allowUnknown: true });

export const createIdentifierSchemaValidate = (data: IIdentifierCreateRequest): Joi.ValidationResult => createIdentifierSchema.validate(data);
export const editIdentifierSchemaValidate = (data: IIdentifierEditRequest): Joi.ValidationResult => editIdentifierSchema.validate(data);
