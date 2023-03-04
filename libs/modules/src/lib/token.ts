import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { Role } from '../typeorm';

export interface TokenPayload {
  userId: number; // for RDB
  role: Role;
}

export const createToken = (
  payload: TokenPayload,
  secret: string,
  options?: SignOptions,
): string => {
  return sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
    ...options,
  });
};

export function verifyToken(
  token: string,
  secret: string,
  options?: VerifyOptions,
): TokenPayload {
  const decoded = verify(token, secret, options) as TokenPayload;
  return decoded;
}
