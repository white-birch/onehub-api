import { NotFoundError } from '../errors';
import logger from '../utils/logger';

import type { Request } from 'express';

const notFoundMiddleware = (req: Request) => {
  const { method, path, url } = req;
  logger.warn({ message: 'Received unsupported request', method, path, url });
  throw new NotFoundError();
};

export default notFoundMiddleware;
