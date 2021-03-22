import { IModuleDetailResponse } from '@edusys/model';
import { IModule } from '../models/module.model';

export const moduleDetailMapper = (data: IModule): IModuleDetailResponse => ({
  id: data._id,
  name: data.name,
  description: data.description,
  permissions: data.permissions,
  enabled: data.enabled,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const moduleListMapper = (modules: IModule[]): IModuleDetailResponse[] => modules?.map((m) => moduleDetailMapper(m));
