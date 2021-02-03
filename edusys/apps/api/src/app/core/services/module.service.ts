import { IModuleCreateRequest, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import { Request, Response } from 'express';
import ModuleEntity, { IModule } from '../entities/module.entity';
import { moduleDetailMapper, moduleListMapper } from '../mappers/module.mapper';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { createModuleSchema, editModuleSchema } from '../validations/module.validations';

// LIST OF ALL MODULES WITHOUT PAGINATION
export const listOfModules = async (request: Request, response: Response): Promise<IModuleDetailResponse[]> => {
  const modules = await ModuleEntity.find();
  if (!modules) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }
  return moduleListMapper(modules);
};

// DETAIL OF MODULE
export const detailOfModule = async (request: Request, response: Response): Promise<IModuleDetailResponse> => {
  const id = request.params.id;
  const module = await ModuleEntity.findById(id);
  if (!module) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }
  return moduleDetailMapper(module);
};

// CREATE NEW MODULE
export const createModule = async (request: Request, response: Response): Promise<IModuleDetailResponse> => {
  const createModule: IModuleCreateRequest = request.body;
  const { error } = createModuleSchema(createModule);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingModule = await ModuleEntity.findOne({ name: createModule.name });
  if (!!existingModule) {
    throw new BadRequest(request.__(errorLabels.EXISTING_NAME));
  }

  const module = new ModuleEntity({
    name: createModule.name,
    description: createModule.description,
  });
  try {
    const savedModule = await module.save();
    return moduleDetailMapper(savedModule);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT MODULE
export const editModule = async (request: Request, response: Response): Promise<IModuleDetailResponse> => {
  const editModule: IModuleEditRequest = request.body;
  const { error } = editModuleSchema(editModule);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = request.params.id;
    const updatedModule = await ModuleEntity.findByIdAndUpdate(id, editModule, { new: true });
    return moduleDetailMapper(updatedModule);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE MODULE
export const deleteModule = async (request: Request, response: Response): Promise<void> => {
  try {
    const id = request.params.id;
    const result = await ModuleEntity.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
