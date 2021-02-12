import { NextFunction, Request, Response, Router } from 'express';
import * as organizationService from './../core/services/organization.service';

// CREATE ORGANIZATION
export const listOfOrganizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfOrganizationsResponse = await organizationService.listOfOrganizations();
    res.send(listOfOrganizationsResponse);
  } catch (err) {
    next(err);
  }
};

// CREATE ORGANIZATION
export const detailOfOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailOrganizationResponse = await organizationService.detailOfOrganization(req.params.id);
    res.send(detailOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

// CREATE ORGANIZATION
export const createOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createOrganizationResponse = await organizationService.createOrganization(req.body);
    res.send(createOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

// EDIT ORGANIZATION
export const editOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editOrganizationResponse = await organizationService.editOrganization(req.body);
    res.send(editOrganizationResponse);
  } catch (err) {
    next(err);
  }
};

// DELETE ORGANIZATION
export const deleteOrganization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await organizationService.deleteOrganization(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const organizationRouter = Router();
organizationRouter.get('/api/organization', listOfOrganizations);
organizationRouter.get('/api/organization/:id', detailOfOrganization);
organizationRouter.post('/api/organization', createOrganization);
organizationRouter.patch('/api/organization/:id', editOrganization);
organizationRouter.delete('/api/organization/:id', deleteOrganization);
