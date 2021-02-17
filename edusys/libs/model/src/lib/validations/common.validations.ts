import * as Joi from '@hapi/joi';
import { IAddress } from '@edusys/model';

export const addressSchema = Joi.object<IAddress>().keys({
  name: Joi.string().min(2).max(255).required(),
  street: Joi.string().max(255).optional(),
  streetNumber: Joi.string().max(255).optional(),
  city: Joi.string().max(255).optional(),
  postalCode: Joi.string().min(2).max(255).optional(),
  country: Joi.string().max(255).optional(),
  location: Joi.optional(),
});

export const addressSchemaValidate = (address: IAddress): Joi.ValidationResult => addressSchema.validate(address);
