import { Router } from 'express';
import { middleware, error } from 'express-openapi-validator';
import { isEqual, uniqWith } from 'lodash';
import logger from '../utils/logger';

import type { Request, Response, NextFunction } from 'express';
import type { ValidationErrorItem } from 'express-openapi-validator/dist/framework/types';

const replyWithError = (res: Response, statusCode: number, message: string, errors: ValidationErrorItem[]) =>
  res.status(statusCode).json({ message, errors: uniqWith(errors, isEqual).map(({ path, message }) => ({ path, message })) });

const openApiMiddleware = () => {
  const router = Router();

  router.use(middleware({ apiSpec: './spec.yaml', validateRequests: true, validateApiSpec: true }));

  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.warn({ message: 'OpenAPI Middleware Error', error: err });

    if (err instanceof error.BadRequest) return replyWithError(res, 400, 'Bad Request', err.errors);
    if (err instanceof error.Unauthorized) return replyWithError(res, 401, 'Unauthorized', err.errors);
    if (err instanceof error.Forbidden) return replyWithError(res, 403, 'Forbidden', err.errors);
    if (err instanceof error.NotFound) return replyWithError(res, 404, 'Not Found', err.errors);
    if (err instanceof error.MethodNotAllowed) return replyWithError(res, 405, 'Method Not Allowed', err.errors);
    if (err instanceof error.NotAcceptable) return replyWithError(res, 406, 'Not Acceptable', err.errors);
    if (err instanceof error.RequestEntityTooLarge) return replyWithError(res, 413, 'Request Entity Too Large', err.errors);
    if (err instanceof error.UnsupportedMediaType) return replyWithError(res, 415, 'Unsupported Media Type', err.errors);
    if (err instanceof error.InternalServerError) return replyWithError(res, 500, 'Internal Server Error', err.errors);

    return next(err);
  });

  return router;
};

export default openApiMiddleware;
