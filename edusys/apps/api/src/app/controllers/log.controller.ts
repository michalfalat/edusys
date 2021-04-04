import { NextFunction, Request, Response, Router } from 'express';
import * as logService from './../core/services/log.service';

export const listOfLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfLogsResponse = await logService.listOfLogs(req.body);
    res.send(listOfLogsResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailLogResponse = await logService.detailOfLog(req.params.id);
    res.send(detailLogResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await logService.deleteLog(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const logRouter = Router();
logRouter.post('/api/log', listOfLogs);
logRouter.get('/api/log/:id', detailOfLog);
logRouter.delete('/api/log/:id', deleteLog);
