import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as subscriptionService from './../core/services/subscription.service';

const listOfSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfSubscriptionsResponse = await subscriptionService.listOfSubscriptions(req.body);
    res.send(listOfSubscriptionsResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailSubscriptionResponse = await subscriptionService.detailOfSubscription(req.params.id);
    res.send(detailSubscriptionResponse);
  } catch (err) {
    next(err);
  }
};

const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createSubscriptionResponse = await subscriptionService.createSubscription(req.body);
    res.send(createSubscriptionResponse);
  } catch (err) {
    next(err);
  }
};

const editSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editSubscriptionResponse = await subscriptionService.editSubscription(req.body);
    res.send(editSubscriptionResponse);
  } catch (err) {
    next(err);
  }
};

const deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const subscriptionRouter = Router();
subscriptionRouter.post('/api/subscription', [verifyToken, verifyPermission(PERMISSION.SUBSCRIPTION.BASIC)], listOfSubscriptions);
subscriptionRouter.get('/api/subscription/:id', [verifyToken, verifyPermission(PERMISSION.SUBSCRIPTION.DETAIL)], detailOfSubscription);
subscriptionRouter.post('/api/subscription', [verifyToken, verifyPermission(PERMISSION.SUBSCRIPTION.CREATE)], createSubscription);
subscriptionRouter.patch('/api/subscription/:id', [verifyToken, verifyPermission(PERMISSION.SUBSCRIPTION.EDIT)], editSubscription);
subscriptionRouter.delete('/api/subscription/:id', [verifyToken, verifyPermission(PERMISSION.SUBSCRIPTION.DELETE)], deleteSubscription);
