import * as jwt from 'jsonwebtoken';
import * as httpContext from 'express-http-context';
import { Request, Response, NextFunction } from 'express';
import { IJWTUserData } from '@edusys/model';

export const currentHttpContext = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!!token) {
      const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      httpContext.set('currentUser', jwt.decode(token));
    }
    httpContext.set('currentLanguage', req.getLocale());
    httpContext.set('currentHostname', req.headers.host);
    next();
  } catch (error) {
    next();
  }
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
