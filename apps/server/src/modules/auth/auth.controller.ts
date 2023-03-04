import { Body, Get, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('/me')
  async me() {
    return 'this.authService.(userId)';
  }
}
