import { Request, Response, NextFunction } from 'express';
import { NotAuthorized } from '../utils/errors';
import { getCurrentUser } from './current-http-context';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const user = getCurrentUser();
    if (!user?.id) throw new NotAuthorized();
    next();
  } catch (error) {
    throw new NotAuthorized();
  }
};
