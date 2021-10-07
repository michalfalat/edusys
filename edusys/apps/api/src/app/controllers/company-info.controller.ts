import { NextFunction, Request, Response, Router } from 'express';
import { verifyToken } from '../core/middlewares/verify-token';
import * as companyInfoService from './../core/services/company-info.service';

const detailOfCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailResponse = await companyInfoService.detailOfCompanyInfo();
    res.send(detailResponse);
  } catch (err) {
    next(err);
  }
};

const editCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editResponse = await companyInfoService.editCompanyInfo(req.body);
    res.send(editResponse);
  } catch (err) {
    next(err);
  }
};

export const companyInfoRouter = Router();
companyInfoRouter.get('/api/company-info', [verifyToken], detailOfCompanyInfo);
companyInfoRouter.patch('/api/company-info', [verifyToken], editCompanyInfo);
