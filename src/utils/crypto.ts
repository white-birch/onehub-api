import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_PRIVATE_KEY) {
  throw new Error('Missing environment variable: JWT_PRIVATE_KEY');
}

if (!process.env.JWT_PUBLIC_KEY) {
  throw new Error('Missing environment variable: JWT_PUBLIC_KEY');
}

if (!process.env.SALT_ROUNDS) {
  throw new Error('Missing environment variable: SALT_ROUNDS');
}

const { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } = process.env;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const compare = (value: string, hash: string) => bcrypt.compare(value, hash);

export const hash = (value: string) => bcrypt.hash(value, SALT_ROUNDS);

export const sign = (payload: Record<string, unknown>): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, JWT_PRIVATE_KEY, { algorithm: 'RS256' }, (error, token) => {
      if (error || !token) reject(error || 'Unexpected error while signing token.');
      else resolve(token);
    })
  );

export const verify = (token: string): Promise<string | jwt.JwtPayload | undefined> =>
  new Promise((resolve, reject) =>
    jwt.verify(token, JWT_PUBLIC_KEY, (error, decoded) => {
      if (error) reject(error);
      else resolve(decoded);
    })
  );
