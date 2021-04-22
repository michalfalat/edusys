import * as Joi from '@hapi/joi';
import { ISubscriptionCreateRequest, ISubscriptionEditRequest } from '@edusys/model';
import { amountSchema } from './common.validations';

export const createSubscriptionSchema = Joi.object<ISubscriptionCreateRequest>({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(512).optional(),
  discount: amountSchema.optional(),
  discountPercentage: Joi.number().optional(),
  finalPrice: amountSchema.required(),
  organizationId: Joi.string().required(),
  package: Joi.string().required(),
  reference: Joi.string().max(255).required(),
});

export const editSubscriptionSchema = Joi.object<ISubscriptionEditRequest>({
  id: Joi.required(),
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(512).optional(),
  discount: amountSchema.optional(),
  discountPercentage: Joi.number().optional(),
  finalPrice: amountSchema.required(),
  organizationId: Joi.string().required(),
  package: Joi.string().required(),
  reference: Joi.string().max(255).required(),
  status: Joi.string().optional(),
  validUntil: Joi.string().required(),
});

export const createSubscriptionSchemaValidate = (data: ISubscriptionCreateRequest): Joi.ValidationResult => createSubscriptionSchema.validate(data);
export const editSubscriptionSchemaValidate = (data: ISubscriptionEditRequest): Joi.ValidationResult => editSubscriptionSchema.validate(data);
