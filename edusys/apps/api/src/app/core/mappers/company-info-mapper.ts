import { ICompanyInfoDetailResponse } from '@edusys/model';
import { ICompanyInfo } from '../models/company-info.model';

export const companyInfoDetailMapper = (companyInfo: ICompanyInfo): ICompanyInfoDetailResponse => ({
  id: companyInfo._id,
  name: companyInfo.name,
  taxId: companyInfo.taxId,
  registeredVAT: companyInfo.registeredVAT,
  address: companyInfo.address,
  bank: companyInfo.bank,
  businessId: companyInfo.businessId,
  registrationNumberVAT: companyInfo.registrationNumberVAT,
});
