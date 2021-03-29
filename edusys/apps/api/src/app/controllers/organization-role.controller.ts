import { NextFunction, Request, Response, Router } from 'express';
import * as organizationRoleService from './../core/services/organization-role.service';

export const listOfOrganizationRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfOrganizationRolesResponse = await organizationRoleService.listOfOrganizationRoles();
    res.send(listOfOrganizationRolesResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailOrganizationRoleResponse = await organizationRoleService.detailOfOrganizationRole(req.params.id);
    res.send(detailOrganizationRoleResponse);
  } catch (err) {
    next(err);
  }
};

export const createOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createOrganizationRoleResponse = await organizationRoleService.createOrganizationRole(req.body);
    res.send(createOrganizationRoleResponse);
  } catch (err) {
    next(err);
  }
};

export const editOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editOrganizationRoleResponse = await organizationRoleService.editOrganizationRole(req.body);
    res.send(editOrganizationRoleResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteOrganizationRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await organizationRoleService.deleteOrganizationRole(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const organizationRoleRouter = Router();
organizationRoleRouter.get('/api/organization-role', listOfOrganizationRoles);
organizationRoleRouter.get('/api/organization-role/:id', detailOfOrganizationRole);
organizationRoleRouter.post('/api/organization-role', createOrganizationRole);
organizationRoleRouter.patch('/api/organization-role/:id', editOrganizationRole);
organizationRoleRouter.delete('/api/organization-role/:id', deleteOrganizationRole);
