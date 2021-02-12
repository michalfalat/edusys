import { NextFunction, Request, Response, Router } from 'express';
import * as moduleService from './../core/services/module.service';

// CREATE MODULE
export const listOfModules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfModulesResponse = await moduleService.listOfModules();
    res.send(listOfModulesResponse);
  } catch (err) {
    next(err);
  }
};

// CREATE MODULE
export const detailOfModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailModuleResponse = await moduleService.detailOfModule(req.params.id);
    res.send(detailModuleResponse);
  } catch (err) {
    next(err);
  }
};

// CREATE MODULE
export const createModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createModuleResponse = await moduleService.createModule(req.body);
    res.send(createModuleResponse);
  } catch (err) {
    next(err);
  }
};

// EDIT MODULE
export const editModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editModuleResponse = await moduleService.editModule(req.body);
    res.send(editModuleResponse);
  } catch (err) {
    next(err);
  }
};

// DELETE MODULE
export const deleteModule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await moduleService.deleteModule(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const moduleRouter = Router();
moduleRouter.get('/api/module', listOfModules);
moduleRouter.get('/api/module/:id', detailOfModule);
moduleRouter.post('/api/module', createModule);
moduleRouter.patch('/api/module/:id', editModule);
moduleRouter.delete('/api/module/:id', deleteModule);
