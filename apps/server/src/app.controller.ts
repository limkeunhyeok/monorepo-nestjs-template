import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly serverService: AppService) {}

  @Get()
  getHello(): string {
    return this.serverService.getHello();
  }

  @Get('/error')
  getError() {
    throw new BadRequestException('TEST');
  }
}
