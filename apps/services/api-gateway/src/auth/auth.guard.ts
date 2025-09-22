import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS_URL = new URL(
  process.env.AUTH_JWKS_URL || 'http://localhost:3003/.well-known/jwks.json'
);
const JWKS = createRemoteJWKSet(JWKS_URL);

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token =
      req.cookies?.test_token ||
      (req.headers.authorization || '').replace(/^Bearer\s+/, '');
    if (!token) throw new UnauthorizedException('No token provided');
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        algorithms: ['RS256'],
      });
      req.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
