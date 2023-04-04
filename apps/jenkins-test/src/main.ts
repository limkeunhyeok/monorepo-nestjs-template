import { LogContext, winstonLogger } from '@common/modules';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3002, () => {
    winstonLogger.log({
      message: `jenkins-test Server starting on port 3002`,
      category: LogContext.Initializer,
    });
  });
}
bootstrap();
