import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import httpContext from 'express-http-context';
import { errorHandlingMiddleware, notFoundMiddleware /*, openApiMiddleware*/, requestLoggerMiddleware, traceMiddleware } from './middleware';
import { affiliates, docs, users } from './services';
import logger from './utils/logger';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('Missing environment variable: PORT');
}

const api = Router();
api.use('/docs', docs);
api.use(affiliates);
api.use(users);

const app = express();
app.use(httpContext.middleware);
app.use(traceMiddleware);
app.use(requestLoggerMiddleware);
app.use(cookieParser());
app.use(express.json());
// app.use(openApiMiddleware()); // TODO: Re-enable
app.use('/api', api);
app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

export const start = async () =>
  new Promise((resolve, reject) => {
    try {
      app.listen(PORT, () => {
        logger.info({ message: `Server listening on port ${PORT}` });
        resolve(null);
      });
    } catch (error) {
      reject(error);
    }
  });
