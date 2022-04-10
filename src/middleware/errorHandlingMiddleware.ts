import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../errors';

import type { Request, Response, NextFunction } from 'express';

const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) return res.status(400).json({ message: 'Bad Request', error: err.message });
  if (err instanceof NotFoundError) return res.status(404).json({ message: 'Not Found', error: err.message });
  if (err instanceof UnauthorizedError) return res.status(401).json({ message: 'Unauthorized', error: err.message });
  if (err instanceof InternalServerError) return res.status(500).json({ message: 'Internal Server Error', error: err.message });

  // Unexpected Error
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandlingMiddleware;
