import * as express from 'express';
import * as mongoose from 'mongoose';
import * as authController from './app/controllers/auth.controller';
import * as dotenv from 'dotenv';
import * as i18n from 'i18n';
import * as path from 'path';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { verifyToken } from './app/core/middlewares/verify-token';
import { verifyRole } from './app/core/middlewares/verify-role';
import { handleErrors } from './app/core/utils/error-handle';
import { AuthUserRole } from '@edusys/model';

const app = express();
dotenv.config({ path: path.join(__dirname, './../.env') });

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB!');
});

i18n.configure({
  locales: ['en', 'sk'],
  directory: path.join(__dirname, 'assets/locales'),
  defaultLocale: 'en',
});

// Middlewares
app.use(helmet());
app.use(i18n.init);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/locales', express.static(path.join(__dirname, 'assets/locales')));

// Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/logout', authController.logout);
app.get('/api/auth/user-info', [verifyToken], authController.userInfo);
app.get('/api/auth/change-password', [verifyToken], authController.changePassword);
app.get('/api/auth/users', [verifyToken, verifyRole(AuthUserRole.ADMIN)], authController.listOfUsers);

// Error handler
app.use(handleErrors);

export default app;
