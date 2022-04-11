import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../errors';
import logger from '../utils/logger';

import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) return res.status(400).json({ message: err.message, errors: err.errors });
  if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
  if (err instanceof UnauthorizedError) return res.status(401).json({ message: err.message });
  if (err instanceof InternalServerError) return res.status(500).json({ message: err.message });

  // Unexpected Error
  logger.error({ message: 'Unexpected Error', error: err });
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandlingMiddleware;
