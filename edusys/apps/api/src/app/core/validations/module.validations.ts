import * as Joi from '@hapi/joi';
import { IModuleCreateRequest, IModuleEditRequest } from '@edusys/model';

export const createModuleSchema = (data: IModuleCreateRequest): Joi.ValidationResult => {
  const schema = Joi.object<IModuleCreateRequest>({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(512).optional(),
  });
  return schema.validate(data);
};

export const editModuleSchema = (data: IModuleEditRequest): Joi.ValidationResult => {
  const schema = Joi.object<IModuleEditRequest>({
    id: Joi.required(),
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(512).optional(),
    enabled: Joi.boolean().optional(),
  });
  return schema.validate(data);
};
