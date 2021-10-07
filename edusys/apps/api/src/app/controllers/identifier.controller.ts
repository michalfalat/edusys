import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as identifierService from './../core/services/identifier.service';

const listOfIdentifiers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfIdentifiersResponse = await identifierService.listOfIdentifiers(req.query as any);
    res.send(listOfIdentifiersResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailIdentifierResponse = await identifierService.detailOfIdentifier(req.params.id);
    res.send(detailIdentifierResponse);
  } catch (err) {
    next(err);
  }
};

const createIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createIdentifierResponse = await identifierService.createIdentifier(req.body);
    res.send(createIdentifierResponse);
  } catch (err) {
    next(err);
  }
};

const editIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editIdentifierResponse = await identifierService.editIdentifier(req.body);
    res.send(editIdentifierResponse);
  } catch (err) {
    next(err);
  }
};

const deleteIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await identifierService.deleteIdentifier(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const identifierRouter = Router();
identifierRouter.get('/api/identifier', [verifyToken, verifyPermission(PERMISSION.IDENTIFIER.BASIC)], listOfIdentifiers);
identifierRouter.get('/api/identifier/:id', [verifyToken, verifyPermission(PERMISSION.IDENTIFIER.DETAIL)], detailOfIdentifier);
identifierRouter.post('/api/identifier', [verifyToken, verifyPermission(PERMISSION.IDENTIFIER.CREATE)], createIdentifier);
identifierRouter.patch('/api/identifier/:id', [verifyToken, verifyPermission(PERMISSION.IDENTIFIER.EDIT)], editIdentifier);
identifierRouter.delete('/api/identifier/:id', [verifyToken, verifyPermission(PERMISSION.IDENTIFIER.DELETE)], deleteIdentifier);
