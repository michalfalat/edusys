import { NextFunction, Request, Response, Router } from 'express';
import * as userService from './../core/services/user.service';

export const listOfUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfUsersResponse = await userService.listOfUsers();
    res.send(listOfUsersResponse);
  } catch (err) {
    next(err);
  }
};

export const detailOfUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailUserResponse = await userService.detailOfUser(req.params.id);
    res.send(detailUserResponse);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserResponse = await userService.createUser(req.body);
    res.send(createUserResponse);
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editUserResponse = await userService.editUser(req.body);
    res.send(editUserResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const userRouter = Router();
userRouter.get('/api/user', listOfUsers);
userRouter.get('/api/user/:id', detailOfUser);
userRouter.post('/api/user', createUser);
userRouter.patch('/api/user/:id', editUser);
userRouter.delete('/api/user/:id', deleteUser);
