import { AllExceptionsFilter, DtoValidationPipe } from '@common/core';
import { LogContext, winstonLogger } from '@common/modules';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new DtoValidationPipe());

  await app.listen(serverConfig.port, () => {
    winstonLogger.log({
      message: `Server starting on port ${serverConfig.port}`,
      category: LogContext.Initializer,
    });
  });
}
bootstrap();
