import { IModuleCreateRequest, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import ModuleEntity from '../entities/module.entity';
import { moduleDetailMapper, moduleListMapper } from '../mappers/module.mapper';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { createModuleSchemaValidate, editModuleSchemaValidate } from '@edusys/model';

// LIST OF ALL MODULES WITHOUT PAGINATION
export const listOfModules = async (): Promise<IModuleDetailResponse[]> => {
  const listOfEntities = await ModuleEntity.find();
  if (!listOfEntities) {
    throw new NotFound();
  }
  return moduleListMapper(listOfEntities);
};

// DETAIL OF MODULE
export const detailOfModule = async (id: string): Promise<IModuleDetailResponse> => {
  const detailEntity = await ModuleEntity.findById(id);
  if (!detailEntity) {
    throw new NotFound();
  }
  return moduleDetailMapper(detailEntity);
};

// CREATE NEW MODULE
export const createModule = async (payload: IModuleCreateRequest): Promise<IModuleDetailResponse> => {
  const { error } = createModuleSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingEntity = await ModuleEntity.findOne({ name: payload.name });
  if (!!existingEntity) {
    throw new BadRequest(errorLabels.EXISTING_NAME);
  }

  const newEntity = new ModuleEntity({
    name: payload.name,
    description: payload.description,
  });
  try {
    const savedEntity = await newEntity.save();
    return moduleDetailMapper(savedEntity);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT MODULE
export const editModule = async (payload: IModuleEditRequest): Promise<IModuleDetailResponse> => {
  const { error } = editModuleSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedEntity = await ModuleEntity.findByIdAndUpdate(id, payload, { new: true });
    return moduleDetailMapper(updatedEntity);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE MODULE
export const deleteModule = async (id: string): Promise<void> => {
  try {
    await ModuleEntity.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
