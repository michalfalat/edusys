import { NextFunction, Request, Response, Router } from 'express';
import * as subscriptionService from './../core/services/subscription.service';

export const listOfSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfSubscriptionsResponse = await subscriptionService.listOfSubscriptions(req.body);
    res.send(listOfSubscriptionsResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailSubscriptionResponse = await subscriptionService.detailOfSubscription(req.params.id);
    res.send(detailSubscriptionResponse);
  } catch (err) {
    next(err);
  }
};

export const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createSubscriptionResponse = await subscriptionService.createSubscription(req.body);
    res.send(createSubscriptionResponse);
  } catch (err) {
    next(err);
  }
};

export const editSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editSubscriptionResponse = await subscriptionService.editSubscription(req.body);
    res.send(editSubscriptionResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const subscriptionRouter = Router();
subscriptionRouter.post('/api/subscription', listOfSubscriptions);
subscriptionRouter.get('/api/subscription/:id', detailOfSubscription);
subscriptionRouter.post('/api/subscription', createSubscription);
subscriptionRouter.patch('/api/subscription/:id', editSubscription);
subscriptionRouter.delete('/api/subscription/:id', deleteSubscription);
