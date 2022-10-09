import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class jwtGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Informe o token de autorização');
    }
    try {
      const token = authorization.split('')[1];

      return true;

      this.JwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Acesso negado');
    }

    return true;
  }
}
