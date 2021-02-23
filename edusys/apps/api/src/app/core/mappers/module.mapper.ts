import { IModuleDetailResponse } from '@edusys/model';
import { IModule } from '../models/module.model';

export const moduleDetailMapper = (module: IModule): IModuleDetailResponse => ({
  id: module.id,
  name: module.name,
  description: module.description,
  enabled: module.enabled,
});

export const moduleListMapper = (modules: IModule[]): IModuleDetailResponse[] => modules?.map((m) => moduleDetailMapper(m));
