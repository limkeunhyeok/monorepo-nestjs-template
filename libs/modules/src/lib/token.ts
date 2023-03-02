import {
  JwtPayload,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from 'jsonwebtoken';

export const createToken = (
  payload: JwtPayload,
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
): JwtPayload {
  const decoded = verify(token, secret, options) as JwtPayload;
  return decoded;
}
