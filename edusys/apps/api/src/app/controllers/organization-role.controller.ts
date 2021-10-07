import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as organizationRoleService from './../core/services/organization-role.service';

const listOfOrganizationRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfOrganizationRolesResponse = await organizationRoleService.listOfOrganizationRoles();
    res.send(listOfOrganizationRolesResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailOrganizationRoleResponse = await organizationRoleService.detailOfOrganizationRole(req.params.id);
    res.send(detailOrganizationRoleResponse);
  } catch (err) {
    next(err);
  }
};

const createOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createOrganizationRoleResponse = await organizationRoleService.createOrganizationRole(req.body);
    res.send(createOrganizationRoleResponse);
  } catch (err) {
    next(err);
  }
};

const editOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editOrganizationRoleResponse = await organizationRoleService.editOrganizationRole(req.body);
    res.send(editOrganizationRoleResponse);
  } catch (err) {
    next(err);
  }
};

const deleteOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await organizationRoleService.deleteOrganizationRole(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const organizationRoleRouter = Router();
organizationRoleRouter.get('/api/organization-role', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION_ROLE.BASIC)], listOfOrganizationRoles);
organizationRoleRouter.get('/api/organization-role/:id', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION_ROLE.DETAIL)], detailOfOrganizationRole);
organizationRoleRouter.post('/api/organization-role', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION_ROLE.CREATE)], createOrganizationRole);
organizationRoleRouter.patch('/api/organization-role/:id', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION_ROLE.EDIT)], editOrganizationRole);
organizationRoleRouter.delete('/api/organization-role/:id', [verifyToken, verifyPermission(PERMISSION.ORGANIZATION_ROLE.DELETE)], deleteOrganizationRole);
