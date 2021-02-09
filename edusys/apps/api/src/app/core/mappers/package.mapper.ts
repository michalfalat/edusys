import { IPackageDetailResponse } from '@edusys/model';
import { IPackage } from '../entities/package.entity';
import { moduleListMapper } from './module.mapper';

export const packageDetailMapper = (pack: IPackage, primaryCurency: string): IPackageDetailResponse => ({
  id: pack.id,
  name: pack.name,
  description: pack.description,
  enabled: pack.enabled,
  annumPricePrimary: pack.annumPrices?.find((price) => price.currency === primaryCurency) || pack.annumPrices?.length ? pack.annumPrices[0] : null,
  annumPrices: pack.annumPrices,
  installationPricePrimary:
    pack.installationPrices?.find((price) => price.currency === primaryCurency) || pack.installationPrices?.length ? pack.installationPrices[0] : null,
  installationPrices: pack.installationPrices,
  modules: moduleListMapper(pack.modules),
});

export const packageListMapper = (packages: IPackage[], primaryCurency: string): IPackageDetailResponse[] =>
  packages?.map((m) => packageDetailMapper(m, primaryCurency));
