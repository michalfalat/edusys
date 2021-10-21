import { NextFunction, Request, Response, Router } from 'express';
import { verifyToken } from '../core/middlewares/verify-token';
import * as logService from './../core/services/log.service';

const listOfLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfLogsResponse = await logService.listOfLogs(req.body);
    res.send(listOfLogsResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailLogResponse = await logService.detailOfLog(req.params.id);
    res.send(detailLogResponse);
  } catch (err) {
    next(err);
  }
};

const deleteLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await logService.deleteLog(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

const serverStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await logService.serverStats();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const logRouter = Router();
logRouter.post('/api/log', [verifyToken], listOfLogs);
logRouter.get('/api/log/:id', [verifyToken], detailOfLog);
logRouter.delete('/api/log/:id', [verifyToken], deleteLog);
logRouter.get('/api/server-stats', serverStats);
