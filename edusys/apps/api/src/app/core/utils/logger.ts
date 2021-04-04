import * as winston from 'winston';
import { MongoDBTransportInstance } from 'winston-mongodb';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { getCurrentUser } from '../middlewares/current-http-context';

const { MongoDB }: { MongoDB: MongoDBTransportInstance } = require('winston-mongodb');
const {}: { MongoDB: MongoDBTransportInstance } = require('winston-daily-rotate-file');

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new winston.transports.File({
    //   filename: 'error.log',
    //   level: 'error',
    //   handleExceptions: true,
    //   format: winston.format.combine(
    //     winston.format.metadata({ key: 'metadata' }),
    //     winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    //     winston.format.align(),
    //     winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${JSON.stringify(info.metadata?.metadata)}`)
    //   ),
    // }),
    // new winston.transports.File({
    //   filename: 'combined.log',
    //   format: winston.format.combine(
    //     winston.format.metadata({ key: 'metadata' }),
    //     winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    //     winston.format.align(),
    //     winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${JSON.stringify(info.metadata?.metadata)}`)
    //   ),
    // }),
    new winston.transports.MongoDB({
      db: process.env.DB_CONNECT,
      collection: 'logs',
      capped: true,
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    }),

    new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '30d',
      format: winston.format.combine(
        winston.format.metadata({ key: 'metadata' }),
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${JSON.stringify(info.metadata?.metadata)}`)
      ),
    }),
  ],
});

export const logError = (message: string | any, meta?: any): void => {
  const { id, email } = getCurrentUser() || {};
  logger.error(message, { metadata: { ...meta, loggedUser: { id, email } } });
};

export const logInfo = (message: string | any, meta?: any): void => {
  const { id, email } = getCurrentUser() || {};
  logger.info(message, { metadata: { ...meta, loggedUser: { id, email } } });
};
