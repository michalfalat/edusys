import { NextFunction, Request, Response, Router } from 'express';
import * as identifierService from './../core/services/identifier.service';

export const listOfIdentifiers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfIdentifiersResponse = await identifierService.listOfIdentifiers(req.query as any);
    res.send(listOfIdentifiersResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailIdentifierResponse = await identifierService.detailOfIdentifier(req.params.id);
    res.send(detailIdentifierResponse);
  } catch (err) {
    next(err);
  }
};

export const createIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createIdentifierResponse = await identifierService.createIdentifier(req.body);
    res.send(createIdentifierResponse);
  } catch (err) {
    next(err);
  }
};

export const editIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editIdentifierResponse = await identifierService.editIdentifier(req.body);
    res.send(editIdentifierResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteIdentifier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await identifierService.deleteIdentifier(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const identifierRouter = Router();
identifierRouter.get('/api/identifier', listOfIdentifiers);
identifierRouter.get('/api/identifier/:id', detailOfIdentifier);
identifierRouter.post('/api/identifier', createIdentifier);
identifierRouter.patch('/api/identifier/:id', editIdentifier);
identifierRouter.delete('/api/identifier/:id', deleteIdentifier);
