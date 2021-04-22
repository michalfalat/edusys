import * as Joi from '@hapi/joi';
import { IAddress } from '@edusys/model';
import { IBankDetail, IAmount } from '../dto/common.dto';

export const addressSchema = Joi.object<IAddress>().keys({
  name: Joi.string().min(2).max(255).required(),
  street: Joi.string().max(255).optional(),
  streetNumber: Joi.string().max(255).optional(),
  city: Joi.string().max(255).optional(),
  postalCode: Joi.string().min(2).max(255).optional(),
  country: Joi.string().max(255).optional(),
  location: Joi.optional(),
});

export const bankDetailSchema = Joi.object<IBankDetail>().keys({
  bankName: Joi.string().max(255).required(),
  IBAN: Joi.string().max(255).required(),
  SWIFT: Joi.string().max(255).optional(),
  currency: Joi.string().max(255).optional(),
});

export const amountSchema = Joi.object<IAmount>().keys({
  amount: Joi.number().min(0).required(),
  currency: Joi.string().max(255).required(),
});

export const addressSchemaValidate = (data: IAddress): Joi.ValidationResult => addressSchema.validate(data);
export const bankDetailSchemaValidate = (data: IBankDetail): Joi.ValidationResult => bankDetailSchema.validate(data);
export const amountSchemaValidate = (data: IAmount): Joi.ValidationResult => amountSchema.validate(data);
