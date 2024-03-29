import { createModuleSchemaValidate, editModuleSchemaValidate, IModuleCreateRequest, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import { moduleDetailMapper, moduleListMapper } from '../mappers/module.mapper';
import ModuleModel from '../models/module.model';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';

// LIST OF ALL MODULES WITHOUT PAGINATION
export const listOfModules = async (): Promise<IModuleDetailResponse[]> => {
  const listOfEntities = await ModuleModel.find();
  if (!listOfEntities) {
    throw new NotFound();
  }
  return moduleListMapper(listOfEntities);
};

// DETAIL OF MODULE
export const detailOfModule = async (id: string): Promise<IModuleDetailResponse> => {
  const detailModel = await ModuleModel.findById(id);
  if (!detailModel) {
    throw new NotFound();
  }
  return moduleDetailMapper(detailModel);
};

// CREATE NEW MODULE
export const createModule = async (payload: IModuleCreateRequest): Promise<IModuleDetailResponse> => {
  const { error } = createModuleSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingModel = await ModuleModel.findOne({ name: payload.name });
  if (existingModel) {
    throw new BadRequest(errorLabels.EXISTING_NAME);
  }

  const newModel = new ModuleModel({
    name: payload.name,
    description: payload.description,
    permissions: payload.permissions,
  });
  try {
    const savedModel = await newModel.save();
    logInfo(`[MODULE_SERVICE] module '${payload.name}' created`);
    return moduleDetailMapper(savedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT MODULE
export const editModule = async (payload: IModuleEditRequest): Promise<IModuleDetailResponse> => {
  const { error } = editModuleSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedModel = await ModuleModel.findByIdAndUpdate(id, payload, { new: true });
    logInfo(`[MODULE_SERVICE] module '${updatedModel.name}' edited`);
    return moduleDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE MODULE
export const deleteModule = async (id: string): Promise<void> => {
  try {
    await ModuleModel.findByIdAndDelete(id);
    logInfo(`[MODULE_SERVICE] module '${id}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
