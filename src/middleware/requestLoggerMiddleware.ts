import logger from '../utils/logger';

import type { NextFunction, Request, Response } from 'express';

const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info({ message: 'Received request', method: req.method, path: req.path });
  next();
};

export default requestLoggerMiddleware;
