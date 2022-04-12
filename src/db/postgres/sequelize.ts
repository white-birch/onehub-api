import { Sequelize } from 'sequelize';
import logger from '../../utils/logger';

const { POSTGRES_URI } = process.env;

if (!POSTGRES_URI) {
  throw new Error('Missing environment variable: POSTGRES_URI');
}

const sequelize = new Sequelize(POSTGRES_URI, { logging: (msg) => logger.verbose(msg) });

export default sequelize;
