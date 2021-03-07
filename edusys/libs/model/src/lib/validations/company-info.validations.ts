import * as Joi from '@hapi/joi';
import { ICompanyInfoEditRequest } from '@edusys/model';
import { addressSchema, bankDetailSchema } from './common.validations';

export const editCompanyInfoSchema = Joi.object<ICompanyInfoEditRequest>({
  id: Joi.required(),
  name: Joi.string().min(2).max(255).required(),
  address: addressSchema.optional(),
  bank: bankDetailSchema.optional(),
  businessId: Joi.string().max(255).optional(),
  registeredVAT: Joi.boolean().optional(),
  registrationNumberVAT: Joi.string().max(255).optional(),
  taxId: Joi.string().max(255).optional(),
});

export const editCompanyInfoSchemaValidate = (data: ICompanyInfoEditRequest): Joi.ValidationResult => editCompanyInfoSchema.validate(data);
