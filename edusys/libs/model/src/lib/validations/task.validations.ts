import * as Joi from '@hapi/joi';
import { ITaskCreateRequest, ITaskEditRequest } from '@edusys/model';
import { ITaskAssignRequest, ITaskFinishRequest } from '../dto/task.dto';

export const createTaskSchema = Joi.object<ITaskCreateRequest>({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(1024).optional(),
  place: Joi.string().max(512).optional(),
  attachments: Joi.array().optional(),
  type: Joi.string().required(),
  priority: Joi.string().required(),
  organizationId: Joi.optional(),
});

export const assignTaskSchema = Joi.object<ITaskAssignRequest>({
  id: Joi.required(),
  estimatedDescription: Joi.string().max(1024).required(),
  estimatedFixOn: Joi.string().max(512).required(),
  fixedBy: Joi.string().required(),
});

export const editTaskSchema = Joi.object<ITaskEditRequest>({
  id: Joi.required(),
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(1024).optional(),
  place: Joi.string().max(512).optional(),
  attachments: Joi.array().optional(),
  type: Joi.string().required(),
  priority: Joi.string().required(),
  organizationId: Joi.optional(),
  status: Joi.string().required(),
  estimatedDescription: Joi.string().max(1024).optional(),
  estimatedFixOn: Joi.optional(),
  createdBy: Joi.optional(),
  fixedBy: Joi.optional(),
  fixedOn: Joi.optional(),
  finalDescription: Joi.string().max(1024).optional(),
});

export const finishTaskSchema = Joi.object<ITaskFinishRequest>({
  id: Joi.required(),
  finalDescription: Joi.string().max(1024).required(),
  fixedOn: Joi.string().max(512).required(),
});

export const createTaskSchemaValidate = (data: ITaskCreateRequest): Joi.ValidationResult => createTaskSchema.validate(data);
export const assignTaskSchemaValidate = (data: ITaskAssignRequest): Joi.ValidationResult => assignTaskSchema.validate(data);
export const editTaskSchemaValidate = (data: ITaskEditRequest): Joi.ValidationResult => editTaskSchema.validate(data);
export const finishTaskSchemaValidate = (data: ITaskFinishRequest): Joi.ValidationResult => finishTaskSchema.validate(data);
