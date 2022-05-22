import httpContext from 'express-http-context';
import { isString } from 'lodash';
import { UnauthorizedError } from '../errors';
import { getOrganizationByApiKey } from '../services/organizations/handlers';
import logger from '../utils/logger';
import nextOnError from './nextOnError';

import type { NextFunction, Request, Response } from 'express';

const apiKeyMiddleware = nextOnError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!isString(apiKey)) {
      logger.warn({ message: 'Request received with missing API key' });
      throw new UnauthorizedError();
    }

    const organization = await getOrganizationByApiKey(apiKey);

    if (!organization) {
      logger.warn({ message: 'Request received containing invalid API key', apiKey });
      throw new UnauthorizedError();
    }

    httpContext.set('apiKey', { organizationId: organization.id, apiKey });
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) next(error);

    logger.warn({ message: 'Unexpected error while verifying API key', error });
    throw new UnauthorizedError();
  }
});

export default apiKeyMiddleware;
