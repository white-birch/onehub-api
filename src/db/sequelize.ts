import { Sequelize } from 'sequelize-typescript';
import logger from '../utils/logger';
import * as models from './models';

const { POSTGRES_URI } = process.env;

if (!POSTGRES_URI) {
  throw new Error('Missing environment variable: POSTGRES_URI');
}

const sequelize = new Sequelize(POSTGRES_URI, { logging: (msg) => logger.verbose(msg), models: Object.values(models) });

sequelize.sync({ alter: false });

export default sequelize;
