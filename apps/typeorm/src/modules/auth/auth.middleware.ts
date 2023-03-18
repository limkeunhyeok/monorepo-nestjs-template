import { verifyToken } from '@common/modules/lib/token';
import { Role } from '@common/modules/typeorm';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { serverConfig } from '../../config';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];

      const decoded: any = verifyToken(token, serverConfig.jwtSecret);

      const user = await this.userService.getUserByQuery({
        id: decoded.userId,
      });

      req['user'] = { userId: user.id, role: user.role };
      return next();
    }

    if (authHeaders || process.env.NODE_ENV === 'dev') {
      req['user'] = { role: Role.GUEST };
      return next();
    } else {
      throw new UnauthorizedException('Invalid Token.');
    }
  }
}
