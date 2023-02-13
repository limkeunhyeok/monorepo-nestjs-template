import { AllExceptionsFilter, DtoValidationPipe } from '@common/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new DtoValidationPipe());

  await app.listen(3000);
}
bootstrap();
