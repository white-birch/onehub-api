import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import httpContext from 'express-http-context';
import { errorHandlingMiddleware, notFoundMiddleware /*, openApiMiddleware*/, requestLoggerMiddleware, traceMiddleware } from './middleware';
import * as services from './services';
import logger from './utils/logger';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('Missing environment variable: PORT');
}

const app = express();
app.use(httpContext.middleware);
app.use(traceMiddleware);
app.use(requestLoggerMiddleware);
app.use(cookieParser());
app.use(express.json());
// app.use(openApiMiddleware()); // TODO: Re-enable

const v1 = Router();
v1.use(Object.values(services));
app.use('/api/v1', v1);

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
