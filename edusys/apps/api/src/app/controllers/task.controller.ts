import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as taskService from './../core/services/task.service';

const listOfTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfTasksResponse = await taskService.listOfTasks(req.query as any);
    res.send(listOfTasksResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailTaskResponse = await taskService.detailOfTask(req.params.id);
    res.send(detailTaskResponse);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createTaskResponse = await taskService.createTask(req.body);
    res.send(createTaskResponse);
  } catch (err) {
    next(err);
  }
};

const editTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await taskService.editTask(req.body);
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};

const assignTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await taskService.assignTask(req.body);
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};

const finishTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await taskService.finishTask(req.body);
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const taskRouter = Router();
taskRouter.get('/api/task', [verifyToken, verifyPermission(PERMISSION.TASK.BASIC)], listOfTasks);
taskRouter.get('/api/task/:id', [verifyToken, verifyPermission(PERMISSION.TASK.DETAIL)], detailOfTask);
taskRouter.post('/api/task/:id/assign', [verifyToken, verifyPermission(PERMISSION.TASK.ASSIGN)], assignTask);
taskRouter.post('/api/task/:id/finish', [verifyToken, verifyPermission(PERMISSION.TASK.EDIT)], finishTask);
taskRouter.post('/api/task', [verifyToken, verifyPermission(PERMISSION.TASK.CREATE)], createTask);
taskRouter.patch('/api/task/:id', [verifyToken, verifyPermission(PERMISSION.TASK.EDIT)], editTask);
taskRouter.delete('/api/task/:id', [verifyToken, verifyPermission(PERMISSION.TASK.DELETE)], deleteTask);
