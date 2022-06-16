import httpContext from 'express-http-context';
import { OrganizationUserRole, User } from '../db';
import { verifyToken } from '../utils/token';

import type { NextFunction, Request, Response } from 'express';

const getToken = (req: Request): string | undefined => {
  const bearerToken = req.headers.authorization?.split(' ')[1];
  const cookieToken = req.cookies.token as string | undefined;
  return bearerToken ?? cookieToken;
};

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);

    if (token) {
      const payload = await verifyToken(token);
      const user = await User.findByPk(payload.userId, { include: [OrganizationUserRole] });
      httpContext.set('token', { value: token, payload, user });
    }
  } catch {
    // * Swallow token validation errors -- no need to do anything since the token won't get added to context
  } finally {
    next();
  }
};

export default tokenMiddleware;
