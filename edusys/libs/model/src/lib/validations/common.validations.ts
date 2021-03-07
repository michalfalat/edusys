import * as Joi from '@hapi/joi';
import { IAddress } from '@edusys/model';
import { IBankDetail } from '../dto/common.dto';

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

export const addressSchemaValidate = (address: IAddress): Joi.ValidationResult => addressSchema.validate(address);
export const bankDetailSchemaValidate = (bank: IBankDetail): Joi.ValidationResult => bankDetailSchema.validate(bank);
