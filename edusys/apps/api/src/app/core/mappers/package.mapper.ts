import { IPackageDetailResponse } from '@edusys/model';
import { IPackage } from '../models/package.model';
import { moduleListMapper } from './module.mapper';

export const packageDetailMapper = (pack: IPackage, primaryCurency: string): IPackageDetailResponse => ({
  id: pack?._id,
  name: pack?.name,
  description: pack?.description,
  enabled: pack?.enabled,
  annumPricePrimary: pack?.annumPrices?.find((price) => price.currency === primaryCurency) || pack?.annumPrices?.length ? pack?.annumPrices[0] : null,
  annumPrices: pack?.annumPrices,
  installationPricePrimary:
    pack?.installationPrices?.find((price) => price.currency === primaryCurency) || pack?.installationPrices?.length ? pack?.installationPrices[0] : null,
  installationPrices: pack?.installationPrices,
  modules: moduleListMapper(pack?.modules),
});

export const packageListMapper = (packages: IPackage[], primaryCurency: string): IPackageDetailResponse[] =>
  packages?.map((m) => packageDetailMapper(m, primaryCurency));
