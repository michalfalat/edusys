import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AccessForbidden } from '../utils/errors';
import { AuthUserRole } from '@edusys/model';

export const verifyRole = (role: AuthUserRole): any => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.decode(token, { complete: true });
  if (decodedToken?.['roles']?.includes(role)) next();
  else throw new AccessForbidden(req.__('error.accessDenied'));
};