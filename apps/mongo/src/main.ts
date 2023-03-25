import { AllExceptionsFilter, DtoValidationPipe } from '@common/core';
import { ApiDocsModule, LogContext, winstonLogger } from '@common/modules';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { serverConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  // request body size 설정
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new DtoValidationPipe());

  ApiDocsModule.register(app, {
    title: serverConfig.serverName,
    description: serverConfig.serverDesc,
    version: serverConfig.serverVersion,
  });

  await app.listen(serverConfig.port, () => {
    winstonLogger.log({
      message: `Server starting on port ${serverConfig.port}`,
      category: LogContext.Initializer,
      context: 'App',
    });
  });
}
bootstrap();
