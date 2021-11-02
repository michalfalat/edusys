import { NextFunction, Request, Response, Router } from 'express';
import * as dashboardService from './../core/services/dashboard.service';

const dashboardWidgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await dashboardService.dashboardWidgets();
    res.send(response);
  } catch (err) {
    next(err);
  }
};

export const dashboardRouter = Router();
dashboardRouter.get('/api/dashboard', dashboardWidgets);
