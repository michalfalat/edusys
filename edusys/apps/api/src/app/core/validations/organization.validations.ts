import * as Joi from '@hapi/joi';
import { IOrganizationCreateRequest, IOrganizationEditRequest } from '@edusys/model';

export const createOrganizationSchema = (data: IOrganizationCreateRequest): Joi.ValidationResult => {
  const schema = Joi.object<IOrganizationCreateRequest>({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(512).optional(),
  });
  return schema.validate(data);
};

export const editOrganizationSchema = (data: IOrganizationEditRequest): Joi.ValidationResult => {
  const schema = Joi.object<IOrganizationEditRequest>({
    id: Joi.required(),
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(512).optional(),
  });
  return schema.validate(data);
};
