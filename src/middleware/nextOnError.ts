import type { RequestHandler, Request, Response, NextFunction } from 'express';

const nextOnError = (handler: RequestHandler) => {
  return function (req: Request, res: Response, next: NextFunction): Promise<void> {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export default nextOnError;
