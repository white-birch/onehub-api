import logger from '../utils/logger';

import type { NextFunction, Request, Response } from 'express';

const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, path, url, query } = req;
  logger.http({ message: 'Received request', method, path, url, query });
  next();
};

export default requestLoggerMiddleware;
