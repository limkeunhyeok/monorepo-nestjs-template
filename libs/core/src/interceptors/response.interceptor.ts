import { LogContext, winstonLogger } from '@common/modules';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === 'http') {
      winstonLogger.debug({
        context: LogContext.HttpResponse,
        message: `res`,
      });

      return next.handle().pipe(
        map((data) => {
          console.log(data);
          return {
            code: 0,
            message: 'success',
            data,
          };
        }),
      );
    }
  }
}
