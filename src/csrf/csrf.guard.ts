import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log('request', request);
    // Extract CSRF token from request headers and cookies
    const csrfTokenFromHeader =
      request.headers['__host-psifi.x-csrf-token'] ||
      request.headers['__Host-psifi.x-csrf-token'];

    // Validate the CSRF token
    if (
      !csrfTokenFromHeader ||
      csrfTokenFromHeader !== process.env.CSRF_SECRET
    ) {
      throw new UnauthorizedException('CSRF token mismatch');
    }

    return true;
  }
}
