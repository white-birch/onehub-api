import httpContext from 'express-http-context';
import { getUser } from '../services/users/handlers';
import { verify } from '../utils/crypto';

import type { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const getToken = (req: Request): string | undefined => {
  const bearerToken = req.headers.authorization?.split(' ')[1];
  const cookieToken = req.cookies.token as string | undefined;
  return bearerToken ?? cookieToken;
};

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);

    if (token) {
      const payload = (await verify(token)) as JwtPayload;
      const user = await getUser(payload.userId);
      httpContext.set('token', { value: token, payload, user });
    }
  } finally {
    next();
  }
};

export default tokenMiddleware;
