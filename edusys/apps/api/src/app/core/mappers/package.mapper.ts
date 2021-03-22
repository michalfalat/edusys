import { IPackageDetailResponse } from '@edusys/model';
import { IPackage } from '../models/package.model';
import { moduleListMapper } from './module.mapper';

export const packageDetailMapper = (data: IPackage, primaryCurency: string): IPackageDetailResponse => ({
  id: data?._id,
  name: data?.name,
  description: data?.description,
  enabled: data?.enabled,
  annumPricePrimary: data?.annumPrices?.find((price) => price.currency === primaryCurency) || data?.annumPrices?.length ? data?.annumPrices[0] : null,
  annumPrices: data?.annumPrices,
  installationPricePrimary:
    data?.installationPrices?.find((price) => price.currency === primaryCurency) || data?.installationPrices?.length ? data?.installationPrices[0] : null,
  installationPrices: data?.installationPrices,
  modules: moduleListMapper(data?.modules),

  createdAt: data?.createdAt,
  updatedAt: data?.updatedAt,
});

export const packageListMapper = (packages: IPackage[], primaryCurency: string): IPackageDetailResponse[] =>
  packages?.map((m) => packageDetailMapper(m, primaryCurency));
