import { IPackageCreateRequest, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import { Request, Response } from 'express';
import ModuleEntity from '../entities/module.entity';
import PackageEntity from '../entities/package.entity';
import { packageDetailMapper, packageListMapper } from '../mappers/package.mapper';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { createPackageSchema, editPackageSchema } from '../validations/package.validations';

// LIST OF ALL PACKAGES WITHOUT PAGINATION
export const listOfPackages = async (request: Request, response: Response): Promise<IPackageDetailResponse[]> => {
  const packages = await PackageEntity.find().populate('modules');
  if (!packages) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }
  console.log('packages :>> ', packages);
  return packageListMapper(packages, process.env.PRIMARY_CURRENCY);
};

// DETAIL OF PACKAGE
export const detailOfPackage = async (request: Request, response: Response): Promise<IPackageDetailResponse> => {
  const id = request.params.id;
  const pack = await PackageEntity.findById(id).populate('modules');
  if (!pack) {
    throw new NotFound(request.__(errorLabels.NOT_FOUND));
  }
  return packageDetailMapper(pack, process.env.PRIMARY_CURRENCY);
};

// CREATE NEW PACKAGE
export const createPackage = async (request: Request, response: Response): Promise<IPackageDetailResponse> => {
  const createPackage: IPackageCreateRequest = request.body;
  const { error } = createPackageSchema(createPackage);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingPackage = await PackageEntity.findOne({ name: createPackage.name });
  if (!!existingPackage) {
    throw new BadRequest(request.__(errorLabels.EXISTING_NAME));
  }
  console.log('createPackage :>> ', createPackage);
  const modules = await ModuleEntity.find().where('_id').in(createPackage.moduleIds).exec();
  console.log('modules :>> ', modules);
  const pack = new PackageEntity({
    name: createPackage.name,
    description: createPackage.description,
    annumPrices: createPackage.annumPrices,
    installationPrices: createPackage.installationPrices,
    modules,
  });
  try {
    const savedPackage = await pack.save();
    return packageDetailMapper(savedPackage, process.env.PRIMARY_CURRENCY);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT PACKAGE
export const editPackage = async (request: Request, response: Response): Promise<IPackageDetailResponse> => {
  const editPackage: IPackageEditRequest = request.body;
  const { error } = editPackageSchema(editPackage);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = request.params.id;
    const updatedPackage = await PackageEntity.findByIdAndUpdate(id, editPackage, { new: true });
    return packageDetailMapper(updatedPackage, process.env.PRIMARY_CURRENCY);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE PACKAGE
export const deletePackage = async (request: Request, response: Response): Promise<void> => {
  try {
    const id = request.params.id;
    const result = await PackageEntity.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
