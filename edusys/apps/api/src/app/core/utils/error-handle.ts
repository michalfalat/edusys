import { Request, Response } from 'express';
import { GeneralError } from './errors';
import { logError } from './logger';

export const handleErrors = (err, req: Request, res: Response, next) => {
  logError(`UNCAUGHT ERROR: ${JSON.stringify(err)}`);
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
      messageLocalized: req.__(err.message),
    });
  }

  return res.status(500).json({
    status: 'error.unknown',
    message: err.message,
  });
};
