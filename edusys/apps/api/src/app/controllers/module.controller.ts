import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as moduleService from './../core/services/module.service';

const listOfModules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfModulesResponse = await moduleService.listOfModules();
    res.send(listOfModulesResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailModuleResponse = await moduleService.detailOfModule(req.params.id);
    res.send(detailModuleResponse);
  } catch (err) {
    next(err);
  }
};

const createModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createModuleResponse = await moduleService.createModule(req.body);
    res.send(createModuleResponse);
  } catch (err) {
    next(err);
  }
};

const editModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editModuleResponse = await moduleService.editModule(req.body);
    res.send(editModuleResponse);
  } catch (err) {
    next(err);
  }
};

const deleteModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await moduleService.deleteModule(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const moduleRouter = Router();
moduleRouter.get('/api/module', [verifyToken, verifyPermission(PERMISSION.MODULE.BASIC)], listOfModules);
moduleRouter.get('/api/module/:id', [verifyToken, verifyPermission(PERMISSION.MODULE.DETAIL)], detailOfModule);
moduleRouter.post('/api/module', [verifyToken, verifyPermission(PERMISSION.MODULE.CREATE)], createModule);
moduleRouter.patch('/api/module/:id', [verifyToken, verifyPermission(PERMISSION.MODULE.EDIT)], editModule);
moduleRouter.delete('/api/module/:id', [verifyToken, verifyPermission(PERMISSION.MODULE.DELETE)], deleteModule);
