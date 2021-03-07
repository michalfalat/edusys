import { NextFunction, Request, Response, Router } from 'express';
import * as companyInfoService from './../core/services/company-info.service';

// CREATE COMPANY INFO
export const detailOfCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailResponse = await companyInfoService.detailOfCompanyInfo();
    res.send(detailResponse);
  } catch (err) {
    next(err);
  }
};

// EDIT COMPANY INFO
export const editCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editResponse = await companyInfoService.editCompanyInfo(req.body);
    res.send(editResponse);
  } catch (err) {
    next(err);
  }
};

export const companyInfoRouter = Router();
companyInfoRouter.get('/api/company-info', detailOfCompanyInfo);
companyInfoRouter.patch('/api/company-info', editCompanyInfo);
