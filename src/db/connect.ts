import logger from '../utils/logger';
import sequelize from './sequelize';

const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info('Connected to Postgres');
  } catch (error) {
    logger.error({ message: 'Error connecting to Postgres', error });
    throw new Error('Error connecting to Postgres');
  }
};

export default connect;
