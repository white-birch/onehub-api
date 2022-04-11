import { NotFoundError } from '../errors';

import type { Request } from 'express';

const notFoundMiddleware = (req: Request) => {
  console.warn(`Received unsupported request: ${req.method} ${req.url}`);
  throw new NotFoundError();
};

export default notFoundMiddleware;
