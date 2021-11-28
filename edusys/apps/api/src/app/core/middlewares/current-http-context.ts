import * as jwt from 'jsonwebtoken';
import * as httpContext from 'express-http-context';
import { Request, Response, NextFunction } from 'express';
import { IJWTUserData, IOrganizationDetailResponse } from '@edusys/model';
import UserModel from '../models/user.model';
import { organizationDetailMapper } from '../mappers/organization.mapper';

export const currentHttpContext = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!!token) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      httpContext.set('currentUser', jwt.decode(token));
      httpContext.set('activeOrganization', await fillActiveOrganization());
    }
    httpContext.set('currentLanguage', req.getLocale());
    httpContext.set('currentHostname', req.headers.host);
    next();
  } catch (error) {
    next();
  }
};

export const fillActiveOrganization = async (): Promise<any> => {
  const jwtData = getCurrentUser();
  const user = await UserModel.findById(jwtData?.id).populate({ path: 'activeOrganization', populate: { path: 'organizationRoles', populate: 'users' } });
  if (!user) {
    return { permissions: [] };
  }
  const activeOrganization = organizationDetailMapper(user.activeOrganization);
  return activeOrganization;
};

export const getCurrentUser = (): IJWTUserData => {
  return httpContext.get('currentUser');
};

export const getCurrentLanguage = (): string => {
  return httpContext.get('currentLanguage');
};

export const getCurrentHostname = (): string => {
  return httpContext.get('currentHostname');
};

export const getActiveOrganization = (): IOrganizationDetailResponse => {
  return httpContext.get('activeOrganization');
};
