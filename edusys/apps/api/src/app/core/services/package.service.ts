import { IPackageCreateRequest, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import ModuleEntity from '../entities/module.entity';
import PackageEntity, { IPackage } from '../entities/package.entity';
import { packageDetailMapper, packageListMapper } from '../mappers/package.mapper';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { createPackageSchemaValidate, editPackageSchemaValidate } from '@edusys/model';

// LIST OF ALL PACKAGES WITHOUT PAGINATION
export const listOfPackages = async (): Promise<IPackageDetailResponse[]> => {
  const listOfEntities = await PackageEntity.find().populate('modules');
  if (!listOfEntities) {
    throw new NotFound();
  }
  return packageListMapper(listOfEntities, process.env.PRIMARY_CURRENCY);
};

// DETAIL OF PACKAGE
export const detailOfPackage = async (id: string): Promise<IPackageDetailResponse> => {
  const detailEntity = await PackageEntity.findById(id).populate('modules');
  if (!detailEntity) {
    throw new NotFound();
  }
  return packageDetailMapper(detailEntity, process.env.PRIMARY_CURRENCY);
};

// CREATE NEW PACKAGE
export const createPackage = async (payload: IPackageCreateRequest): Promise<IPackageDetailResponse> => {
  const { error } = createPackageSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingEntity = await PackageEntity.findOne({ name: payload.name });
  if (!!existingEntity) {
    throw new BadRequest(errorLabels.EXISTING_NAME);
  }
  const modules = await ModuleEntity.find().where('_id').in(payload.moduleIds).exec();
  const newEntity = new PackageEntity({
    name: payload.name,
    description: payload.description,
    annumPrices: payload.annumPrices,
    installationPrices: payload.installationPrices,
    modules,
  });
  try {
    const savedEntity = await newEntity.save();
    return packageDetailMapper(savedEntity, process.env.PRIMARY_CURRENCY);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT PACKAGE
export const editPackage = async (payload: IPackageEditRequest): Promise<IPackageDetailResponse> => {
  const { error } = editPackageSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const modules = await ModuleEntity.find().where('_id').in(payload.moduleIds).exec();
    const editedPackage = {
      name: payload.name,
      description: payload.description,
      annumPrices: payload.annumPrices,
      installationPrices: payload.installationPrices,
      modules,
    };
    const updatedEntity = await PackageEntity.findByIdAndUpdate(id, editedPackage, { new: true });
    return packageDetailMapper(updatedEntity, process.env.PRIMARY_CURRENCY);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE PACKAGE
export const deletePackage = async (id: string): Promise<void> => {
  try {
    await PackageEntity.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};
