import httpContext from 'express-http-context';
import { v4 as uuid } from 'uuid';

import type { NextFunction, Request, Response } from 'express';

const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const traceId = req.headers['x-onehub-trace-id'] || uuid();
  httpContext.set('traceId', traceId);
  next();
};

export default traceMiddleware;
