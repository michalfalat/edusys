import * as Joi from '@hapi/joi';
import { IModuleCreateRequest, IModuleEditRequest } from '@edusys/model';

export const createModuleSchema = Joi.object<IModuleCreateRequest>({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(512).optional(),
});

export const editModuleSchema = Joi.object<IModuleEditRequest>({
  id: Joi.required(),
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(512).optional(),
  enabled: Joi.boolean().optional(),
});

export const createModuleSchemaValidate = (data: IModuleCreateRequest): Joi.ValidationResult => createModuleSchema.validate(data);
export const editModuleSchemaValidate = (data: IModuleEditRequest): Joi.ValidationResult => editModuleSchema.validate(data);
