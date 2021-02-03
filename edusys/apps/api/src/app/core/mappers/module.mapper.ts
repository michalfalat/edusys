import { IModuleDetailResponse } from '@edusys/model';
import { IModule } from '../entities/module.entity';

export const moduleDetailMapper = (module: IModule): IModuleDetailResponse => ({
  id: module.id,
  name: module.name,
  description: module.description,
  enabled: module.enabled,
});

export const moduleListMapper = (modules: IModule[]): IModuleDetailResponse[] => modules?.map((m) => moduleDetailMapper(m));
