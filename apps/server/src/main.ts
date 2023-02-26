import { AllExceptionsFilter, DtoValidationPipe } from '@common/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new DtoValidationPipe());

  console.log('TEST', process.cwd(), process.execPath);
  console.log('TEST', __dirname);
  await app.listen(3000);
}
bootstrap();
