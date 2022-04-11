import mongoose from 'mongoose';
import logger from '../utils/logger';

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error('Missing environment variable: MONGO_URI');
}

const connect = async () => {
  await mongoose.connect(MONGO_URI);
  logger.info({ message: 'Connected to MongoDB' });
};

export default connect;
