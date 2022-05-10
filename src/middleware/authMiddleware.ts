import httpContext from 'express-http-context';
import { UnauthorizedError } from '../errors';
import logger from '../utils/logger';
import nextOnError from './nextOnError';

import type { Request, Response, NextFunction } from 'express';
import type { TokenContext } from 'types';
import type { AuthAddOn } from 'utils/auth';

const DISABLE_AUTH = process.env.DISABLE_AUTH === 'true';

const authMiddleware = (addOns?: AuthAddOn[]) =>
  nextOnError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (DISABLE_AUTH) return next();

      const tokenContext = httpContext.get('token') as TokenContext | undefined;

      if (!tokenContext) {
        logger.warn('Missing or invalid token');
        throw new UnauthorizedError();
      }

      const { user } = tokenContext;

      if (!user) {
        logger.warn('Unable to find user from token');
        throw new UnauthorizedError();
      }

      if (addOns && !user.isSuperUser) {
        for (const addOn of addOns) {
          await addOn(tokenContext);
        }
      }

      next();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }

      logger.error({ message: 'Unexpected error while authenticating', error });
      throw new UnauthorizedError();
    }
  });

export default authMiddleware;
