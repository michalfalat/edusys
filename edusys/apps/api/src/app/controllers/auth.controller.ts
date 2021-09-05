import { NextFunction, Request, Response, Router } from 'express';
// import { verifyRole } from '../core/middlewares/verify-role';
import { verifyToken } from '../core/middlewares/verify-token';
import { BadRequest } from '../core/utils/errors';
import * as authService from './../core/services/auth.service';
import * as verificationTokenService from './../core/services/verify-token.service';
import * as emailService from './../core/services/email.service';
import * as httpContext from 'express-http-context';
import { EmailType } from '@edusys/email-sender';

// REGISTER
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const registerResponse = await authService.register(req.body);
    // res.send(registerResponse);
    res.send({});
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.login(req.body);
    res.send(token);
  } catch (err) {
    next(err);
  }
};

// USER INFO
export const userInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetail = await authService.userInfo();
    res.send(userDetail);
  } catch (err) {
    next(err);
  }
};

// CHANGE PASSWORD
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const changeResult = await authService.changePassword(req.body);
    res.send(changeResult);
  } catch (err) {
    next(err);
  }
};

export const verifyTokenInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await verificationTokenService.verificationTokenInfo(req.body);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const createPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.createPassword(req.body);
    res.send({});
  } catch (err) {
    next(err);
  }
};

// SEED SU
export const seedSU = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.seedSU();
    res.send({ status: 'OK' });
  } catch (err) {
    next(err);
  }
};

// TEST EMAIL
export const testEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.query.to) {
      throw new BadRequest(`Missing email property \'to\' `);
    }
    await emailService.sendEmail(EmailType.TEST_EMAIL, req.query.to as string, { name: 'hello' });
    res.send({ status: 'OK' });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(httpContext.get('currentUser'));
    res.send({});
  } catch (err) {
    next(err);
  }
};

export const authRouter = Router();
authRouter.post('/api/auth/register', register);
authRouter.post('/api/auth/login', login);
authRouter.post('/api/auth/logout', logout);
authRouter.post('/api/auth/verify-token', verifyTokenInfo);
authRouter.post('/api/auth/create-password', createPassword);
authRouter.get('/api/auth/user-info', [verifyToken], userInfo);
authRouter.get('/api/auth/change-password', [verifyToken], changePassword);
authRouter.post('/api/auth/test-email', testEmail);
// authRouter.get('/api/auth/users', [verifyToken, verifyRole(AuthUserRole.ADMIN)], listOfUsers);
authRouter.post('/api/auth/seedSU', seedSU);
