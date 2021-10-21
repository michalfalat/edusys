import { Request, Response, NextFunction } from 'express';
import { GeneralError } from './errors';
import { logError } from './logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleErrors = (err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
      messageLocalized: req.__(err.message),
      metadata: err.metadata,
    });
  }

  logError(`UNCAUGHT ERROR: ${JSON.stringify(err)}`);
  return res.status(500).json({
    status: 'error.unknown',
    message: err.message,
  });
};
