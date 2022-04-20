import httpContext from 'express-http-context';
import { UnauthorizedError } from '../errors';
import logger from '../utils/logger';
import nextOnError from './nextOnError';

import type { Request, Response, NextFunction } from 'express';
import type { TokenContext } from 'types';

const DISABLE_AUTH = process.env.DISABLE_AUTH === 'true';

type AuthAddOn = (req: Request, tokenContext: TokenContext) => void | Promise<void>;

const authMiddleware = (addOns?: AuthAddOn[]) =>
  nextOnError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (DISABLE_AUTH) return next();

    const tokenContext = httpContext.get('token') as TokenContext | undefined;

    if (!tokenContext) {
      logger.warn('Missing or invalid token');
      throw new UnauthorizedError();
    }

    if (!tokenContext.user) {
      logger.warn('Unable to find user from token');
      throw new UnauthorizedError();
    }

    if (addOns) {
      for (const addOn of addOns) {
        await addOn(req, tokenContext);
      }
    }

    next();
  });

export default authMiddleware;

// export const authorizeUserOperation = async (req: Request, payload: JwtPayload) => {
//   const requestedUserId = req.params.userId;
//   const jwtUserId = payload.userId;

//   if (!requestedUserId) {
//     logger.warn('Missing userId in request');
//     throw new BadRequestError([ErrorCode.IdRequired]);
//   }

//   if (!jwtUserId) {
//     logger.warn('Missing userId in token');
//     throw new UnauthorizedError();
//   }

//   if (requestedUserId === jwtUserId) {
//     return;
//   }

//   const user = await getUser(jwtUserId);
//   const isAdmin = user?.roles.includes(Role.Admin);

//   if (!isAdmin && requestedUserId !== jwtUserId) {
//     logger.warn('User is not authorized to perform requested operation.');
//     throw new UnauthorizedError();
//   }
// };

// export const authorizeUserManagement = async (req: Request, payload: JwtPayload) => {
//   const userId = payload.userId;

//   if (!userId) {
//     logger.warn('Missing userId in token');
//     throw new UnauthorizedError();
//   }

//   const user = await getUser(userId);

//   if (!user) {
//     logger.warn('Invalid userId in token');
//     throw new UnauthorizedError();
//   }

//   if (!user.roles.includes(Role.Admin)) {
//     logger.warn('User is not authorized to perform requested operation');
//     throw new UnauthorizedError();
//   }
// };
