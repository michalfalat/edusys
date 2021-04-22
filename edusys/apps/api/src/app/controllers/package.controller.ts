import { NextFunction, Request, Response, Router } from 'express';
import * as packageService from './../core/services/package.service';

export const listOfPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfPackagesResponse = await packageService.listOfPackages();
    res.send(listOfPackagesResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailPackageResponse = await packageService.detailOfPackage(req.params.id);
    res.send(detailPackageResponse);
  } catch (err) {
    next(err);
  }
};

export const createPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPackageResponse = await packageService.createPackage(req.body);
    res.send(createPackageResponse);
  } catch (err) {
    next(err);
  }
};

export const editPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editPackageResponse = await packageService.editPackage(req.body);
    res.send(editPackageResponse);
  } catch (err) {
    next(err);
  }
};

export const deletePackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await packageService.deletePackage(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const packageRouter = Router();
packageRouter.get('/api/package', listOfPackages);
packageRouter.get('/api/package/:id', detailOfPackage);
packageRouter.post('/api/package', createPackage);
packageRouter.patch('/api/package/:id', editPackage);
packageRouter.delete('/api/package/:id', deletePackage);
