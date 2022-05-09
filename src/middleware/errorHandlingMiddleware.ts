import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from '../errors';
import logger from '../utils/logger';

import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BadRequestError) return res.status(400).json({ message: error.message, errors: error.errors });
  if (error instanceof ForbiddenError) return res.status(403).json({ message: error.message });
  if (error instanceof NotFoundError) return res.status(404).json({ message: error.message });
  if (error instanceof UnauthorizedError) return res.status(401).json({ message: error.message });
  if (error instanceof InternalServerError) return res.status(500).json({ message: error.message });

  // Unexpected Error
  logger.error({ message: 'Unexpected Error', error });
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandlingMiddleware;
