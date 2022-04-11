import httpContext from 'express-http-context';
import { v4 as uuid } from 'uuid';

import type { NextFunction, Request, Response } from 'express';

const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  httpContext.set('traceId', uuid());
  next();
};

export default traceMiddleware;
