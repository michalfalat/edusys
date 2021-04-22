import { createPackageSchemaValidate, editPackageSchemaValidate, IPackageCreateRequest, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import { packageDetailMapper, packageListMapper } from '../mappers/package.mapper';
import ModuleModel from '../models/module.model';
import PackageModel from '../models/package.model';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';

// LIST OF ALL PACKAGES WITHOUT PAGINATION
export const listOfPackages = async (): Promise<IPackageDetailResponse[]> => {
  const listOfEntities = await PackageModel.find().populate('modules');
  if (!listOfEntities) {
    throw new NotFound();
  }
  return packageListMapper(listOfEntities, process.env.PRIMARY_CURRENCY);
};

// DETAIL OF PACKAGE
export const detailOfPackage = async (id: string): Promise<IPackageDetailResponse> => {
  const detailModel = await PackageModel.findById(id).populate('modules');
  if (!detailModel) {
    throw new NotFound();
  }
  return packageDetailMapper(detailModel, process.env.PRIMARY_CURRENCY);
};

// CREATE NEW PACKAGE
export const createPackage = async (payload: IPackageCreateRequest): Promise<IPackageDetailResponse> => {
  const { error } = createPackageSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingModel = await PackageModel.findOne({ name: payload.name });
  if (existingModel) {
    throw new BadRequest(errorLabels.EXISTING_NAME);
  }
  const newModel = new PackageModel({
    name: payload.name,
    description: payload.description,
    annumPrices: payload.annumPrices,
    installationPrices: payload.installationPrices,
    modules: payload.moduleIds,
  });
  try {
    const savedModel = await newModel.save();
    logInfo(`[PACKAGE_SERVICE] package '${payload.name}' created with ${payload.moduleIds?.length} modules`);
    return packageDetailMapper(savedModel, process.env.PRIMARY_CURRENCY);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT PACKAGE
export const editPackage = async (payload: IPackageEditRequest): Promise<IPackageDetailResponse> => {
  const { error } = editPackageSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const modules = await ModuleModel.find().where('_id').in(payload.moduleIds).exec();
    const editedPackage = {
      name: payload.name,
      description: payload.description,
      annumPrices: payload.annumPrices,
      installationPrices: payload.installationPrices,
      modules,
    };
    const updatedModel = await PackageModel.findByIdAndUpdate(id, editedPackage, { new: true });
    logInfo(`[PACKAGE_SERVICE] package '${payload.name}' edited`);
    return packageDetailMapper(updatedModel, process.env.PRIMARY_CURRENCY);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE PACKAGE
export const deletePackage = async (id: string): Promise<void> => {
  try {
    await PackageModel.findByIdAndDelete(id);
    logInfo(`[PACKAGE_SERVICE] package '${id}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
