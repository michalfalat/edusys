import { NextFunction, Request, Response, Router } from 'express';
import * as taskService from './../core/services/task.service';

export const listOfTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfTasksResponse = await taskService.listOfTasks();
    res.send(listOfTasksResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailTaskResponse = await taskService.detailOfTask(req.params.id);
    res.send(detailTaskResponse);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createTaskResponse = await taskService.createTask(req.body);
    res.send(createTaskResponse);
  } catch (err) {
    next(err);
  }
};

export const editTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await taskService.editTask(req.body);
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};

export const assignTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await taskService.assignTask(req.body);
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};

export const finishTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseData = await taskService.finishTask(req.body);
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const taskRouter = Router();
taskRouter.get('/api/task', listOfTasks);
taskRouter.get('/api/task/:id', detailOfTask);
taskRouter.post('/api/task/:id/assign', assignTask);
taskRouter.post('/api/task/:id/finish', finishTask);
taskRouter.post('/api/task', createTask);
taskRouter.patch('/api/task/:id', editTask);
taskRouter.delete('/api/task/:id', deleteTask);
