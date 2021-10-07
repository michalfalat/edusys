import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as packageService from './../core/services/package.service';

const listOfPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfPackagesResponse = await packageService.listOfPackages();
    res.send(listOfPackagesResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailPackageResponse = await packageService.detailOfPackage(req.params.id);
    res.send(detailPackageResponse);
  } catch (err) {
    next(err);
  }
};

const createPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPackageResponse = await packageService.createPackage(req.body);
    res.send(createPackageResponse);
  } catch (err) {
    next(err);
  }
};

const editPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editPackageResponse = await packageService.editPackage(req.body);
    res.send(editPackageResponse);
  } catch (err) {
    next(err);
  }
};

const deletePackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await packageService.deletePackage(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const packageRouter = Router();
packageRouter.get('/api/package', [verifyToken, verifyPermission(PERMISSION.PACKAGE.BASIC)], listOfPackages);
packageRouter.get('/api/package/:id', [verifyToken, verifyPermission(PERMISSION.PACKAGE.DETAIL)], detailOfPackage);
packageRouter.post('/api/package', [verifyToken, verifyPermission(PERMISSION.PACKAGE.CREATE)], createPackage);
packageRouter.patch('/api/package/:id', [verifyToken, verifyPermission(PERMISSION.PACKAGE.EDIT)], editPackage);
packageRouter.delete('/api/package/:id', [verifyToken, verifyPermission(PERMISSION.PACKAGE.DELETE)], deletePackage);
