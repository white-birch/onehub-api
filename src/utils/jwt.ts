import jwt from 'jsonwebtoken';

if (!process.env.JWT_PRIVATE_KEY) {
  throw new Error('Missing environment variable: JWT_PRIVATE_KEY');
}

if (!process.env.JWT_PUBLIC_KEY) {
  throw new Error('Missing environment variable: JWT_PUBLIC_KEY');
}

const { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } = process.env;

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
