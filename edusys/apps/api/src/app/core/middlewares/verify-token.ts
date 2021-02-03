import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorized } from '../utils/errors';
import { errorLabels } from '../utils/error-labels';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) throw new NotAuthorized(req.__(errorLabels.UNAUTHORIZED));
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.jwtToken = verifiedToken;
    next();
  } catch (error) {
    throw new NotAuthorized(req.__(errorLabels.UNAUTHORIZED));
  }
};
