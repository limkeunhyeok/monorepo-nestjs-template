import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export interface LogParams {
  message: string;
  category: LogCategory;
  error?: Error;
}

export const LogCategory = {
  Initializer: 'Initializer',
  BaseTransfer: 'BaseTransfer',
  UnhandledError: 'UnhandledError',
  HttpRequest: 'HttpRequest',
  HttpResponse: 'HttpResponse',
  HttpException: 'HttpException',
  DBFail: 'DBFail',
  Parsing: 'Parsing',
  AimTaskManage: 'AimTaskManage',
  MessageSend: 'MessageSend',
  MessageReceived: 'MessageReceived',
} as const;

export type LogCategory = (typeof LogCategory)[keyof typeof LogCategory];

// cross-env로 node_env 설정
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'http' : 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
    }),
  ],
});
