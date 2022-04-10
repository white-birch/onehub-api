import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandlingMiddleware, notFoundMiddleware /*, openApiMiddleware*/ } from './middleware';
import { affiliates, docs, users } from './services';

const api = Router();
api.use((req, res, next) => {
  console.info(req.path);
  next();
});
api.use('/docs', docs);
api.use(affiliates);
api.use(users);

const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(openApiMiddleware()); // TODO: Re-enable
app.use('/api', api);
app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

export const start = async () =>
  new Promise((resolve, reject) => {
    try {
      const PORT = process.env.PORT;

      if (!PORT) {
        throw new Error('Missing environment variable: PORT');
      }

      app.listen(PORT, () => {
        console.info(`Server listening on port ${PORT}`);
        resolve(null);
      });
    } catch (error) {
      reject(error);
    }
  });
