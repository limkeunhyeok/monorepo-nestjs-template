import { LogContext, winstonLogger } from '@common/modules';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, headers, query, body } = req;

    res.on('close', () => {
      const { statusCode } = res;
      const logMessage = JSON.stringify({
        baseUrl,
        method,
        headers,
        query,
        body,
        statusCode,
      });

      winstonLogger.log({
        context: 'HTTP',
        category: LogContext.HttpResponse,
        message: logMessage,
      });
    });

    next();
  }
}
