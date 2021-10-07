import { PERMISSION } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyPermission } from '../core/middlewares/verify-permission';
import { verifyToken } from '../core/middlewares/verify-token';
import * as userService from './../core/services/user.service';

const listOfUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfUsersResponse = await userService.listOfUsers();
    res.send(listOfUsersResponse);
  } catch (err) {
    next(err);
  }
};

const detailOfUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailUserResponse = await userService.detailOfUser(req.params.id);
    res.send(detailUserResponse);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserResponse = await userService.createUser(req.body);
    res.send(createUserResponse);
  } catch (err) {
    next(err);
  }
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const editUserResponse = await userService.editUser(req.body);
    res.send(editUserResponse);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
};

export const userRouter = Router();
userRouter.get('/api/user', [verifyToken, verifyPermission(PERMISSION.USER.BASIC)], listOfUsers);
userRouter.get('/api/user/:id', [verifyToken, verifyPermission(PERMISSION.USER.DETAIL)], detailOfUser);
userRouter.post('/api/user', [verifyToken, verifyPermission(PERMISSION.USER.CREATE)], createUser);
userRouter.patch('/api/user/:id', [verifyToken, verifyPermission(PERMISSION.USER.EDIT)], editUser);
userRouter.delete('/api/user/:id', [verifyToken, verifyPermission(PERMISSION.USER.DELETE)], deleteUser);
