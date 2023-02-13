import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export interface LogParams {
  message: string;
  category: LogContext;
  error?: Error;
}

export const LogContext = {
  Initializer: 'Initializer',
  BaseTransfer: 'BaseTransfer',
  UnhandledError: 'UnhandledError',
  HttpRequest: 'HttpRequest',
  HttpResponse: 'HttpResponse',
  HttpException: 'HttpException',
  DBFail: 'DBFail',
  Parsing: 'Parsing',
  MessageSend: 'MessageSend',
  MessageReceived: 'MessageReceived',
} as const;

export type LogContext = (typeof LogContext)[keyof typeof LogContext];

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
