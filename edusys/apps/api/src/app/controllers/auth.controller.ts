import { AuthUserRole } from '@edusys/model';
import { NextFunction, Request, Response, Router } from 'express';
import { verifyRole } from '../core/middlewares/verify-role';
import { verifyToken } from '../core/middlewares/verify-token';
import { BadRequest } from '../core/utils/errors';
import * as authService from './../core/services/auth.service';
import * as emailService from './../core/services/email.service';

// REGISTER
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registerResponse = await authService.register(req, res);
    res.send(registerResponse);
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.login(req, res);
    res.send(token);
  } catch (err) {
    next(err);
  }
};

// USER INFO
export const userInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetail = await authService.userInfo(req, res);
    res.send(userDetail);
  } catch (err) {
    next(err);
  }
};

// CHANGE PASSWORD
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const changeResult = await authService.changePassword(req, res);
    res.send(changeResult);
  } catch (err) {
    next(err);
  }
};

// LIST OF USERS
export const listOfUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await authService.listOfUsers(req, res);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

// SEED SU
export const seedSU = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.seedSU(req, res);
    res.send({ status: 'OK' });
  } catch (err) {
    next(err);
  }
};

// TEST EMAIL
export const testEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await emailService.sendTestEmail(req, res);
    if (!req.query.to) {
      throw new BadRequest("Missing email property 'to' ");
    }
    res.send({ status: 'OK' });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({});
  } catch (err) {
    next(err);
  }
};

export const authRouter = Router();
authRouter.post('/api/auth/register', register);
authRouter.post('/api/auth/login', login);
authRouter.post('/api/auth/logout', logout);
authRouter.get('/api/auth/user-info', [verifyToken], userInfo);
authRouter.get('/api/auth/change-password', [verifyToken], changePassword);
authRouter.post('/api/auth/test-email', testEmail);
authRouter.get('/api/auth/users', [verifyToken, verifyRole(AuthUserRole.ADMIN)], listOfUsers);
authRouter.post('/api/auth/seedSU', seedSU);
