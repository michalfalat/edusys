import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as organizationService from './../core/services/organization.service';

const listOfOrganizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfOrganizationsResponse = await organizationService.listOfOrganizations();
    res.send(listOfOrganizationsResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailOrganizationResponse = await organizationService.detailOfOrganization(req.params.id);
    res.send(detailOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

const createOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createOrganizationResponse = await organizationService.createOrganization(req.body);
    res.send(createOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

const editOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editOrganizationResponse = await organizationService.editOrganization(req.body);
    res.send(editOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

const availablePermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editOrganizationResponse = await organizationService.getAvailablePermissions(req.params.id);
    res.send(editOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

const deleteOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await organizationService.deleteOrganization(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const organizationRouter = Router();
organizationRouter.get('/api/organization', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION.BASIC)], listOfOrganizations);
organizationRouter.get('/api/organization/:id', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION.DETAIL)], detailOfOrganization);
organizationRouter.get('/api/organization/:id/available-permissions', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION.BASIC)], availablePermissions);
organizationRouter.post('/api/organization', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION.CREATE)], createOrganization);
organizationRouter.patch('/api/organization/:id', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION.EDIT)], editOrganization);
organizationRouter.delete('/api/organization/:id', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION.DELETE)], deleteOrganization);
