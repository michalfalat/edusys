import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as i18n from 'i18n';
import * as path from 'path';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as httpContext from 'express-http-context';
import { handleErrors } from './app/core/utils/error-handle';
import { packageRouter } from './app/controllers/package.controller';
import { authRouter } from './app/controllers/auth.controller';
import { moduleRouter } from './app/controllers/module.controller';
import { organizationRouter } from './app/controllers/organization.controller';
import { currentHttpContext } from './app/core/middlewares/current-http-context';
import { invoiceRouter } from './app/controllers/invoice.controller';
import { companyInfoRouter } from './app/controllers/company-info.controller';
import { taskRouter } from './app/controllers/task.controller';
import { fileRouter } from './app/controllers/file.controller';

const app = express();
dotenv.config({ path: path.join(__dirname, './../.env') });

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
  console.log('Connected to DB!');
});

i18n.configure({
  locales: ['en', 'sk'],
  directory: path.join(__dirname, 'assets/locales'),
  defaultLocale: 'sk',
});

// Middlewares
app.use(helmet());
app.use(i18n.init);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/locales', express.static(path.join(__dirname, 'assets/locales')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(httpContext.middleware);
app.use(currentHttpContext);

// Routes
app.use(fileRouter);
app.use(companyInfoRouter);
app.use(authRouter);
app.use(moduleRouter);
app.use(packageRouter);
app.use(organizationRouter);
app.use(invoiceRouter);
app.use(taskRouter);

// Error handler
app.use(handleErrors);

export default app;
