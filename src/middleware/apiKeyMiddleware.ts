import httpContext from 'express-http-context';
import { isString } from 'lodash';
import { UnauthorizedError } from '../errors';
import logger from '../utils/logger';

import type { NextFunction, Request, Response } from 'express';

const API_KEYS = {
  DAUNTLESS: '8fc13bae-2d1e-40c8-bd7f-db87dcbd696c',
};

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!isString(apiKey)) {
    logger.warn({ message: 'Request received with missing API key' });
    throw new UnauthorizedError();
  }

  const [client] = Object.entries(API_KEYS).find(([, value]) => value === apiKey) || [];

  if (!client) {
    logger.warn({ message: 'Request received containing invalid API key', apiKey });
    throw new UnauthorizedError();
  }

  httpContext.set('apiKey', { client, apiKey });
  next();
};

export default apiKeyMiddleware;
