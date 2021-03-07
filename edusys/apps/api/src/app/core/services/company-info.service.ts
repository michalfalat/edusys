import { ICompanyInfoDetailResponse, ICompanyInfoEditRequest } from '@edusys/model';
import CompanyInfoModel from '../models/company-info.model';
import { BadRequest } from '../utils/errors';
import { editCompanyInfoSchemaValidate } from '@edusys/model';
import { companyInfoDetailMapper } from '../mappers/company-info-mapper';
import { companyInfoSeed } from './../../seeders/basic';

// DETAIL OF COMPANY INFO
export const detailOfCompanyInfo = async (): Promise<ICompanyInfoDetailResponse> => {
  let detailModel = await CompanyInfoModel.findOne();
  if (!detailModel) {
    console.log(detailModel);
    return createCompanyInfo();
  }
  return companyInfoDetailMapper(detailModel);
};

// CREATE NEW COMPANY INFO
export const createCompanyInfo = async (): Promise<ICompanyInfoDetailResponse> => {
  const newModel = new CompanyInfoModel({
    ...companyInfoSeed,
  });
  try {
    const savedModel = await newModel.save();
    return companyInfoDetailMapper(savedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT MODULE
export const editCompanyInfo = async (payload: ICompanyInfoEditRequest): Promise<ICompanyInfoDetailResponse> => {
  const { error } = editCompanyInfoSchemaValidate(payload);
  if (!!error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const updatedModel = await CompanyInfoModel.findByIdAndUpdate(id, payload, { new: true });
    return companyInfoDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};
