import { winstonLogger } from '@common/modules';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MQLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === 'rpc') {
      const receivedRpc = context.switchToRpc();
      const receivedController = context.getClass();
      const receivedHandler = context.getHandler();

      const logMessage = `To Class : "${
        receivedController.name
      }", which Handler : "${
        receivedHandler.name
      }", with received Data : "${JSON.stringify(receivedRpc.getData())}"`;

      winstonLogger.log(logMessage);

      return next.handle();
    }
  }
}
