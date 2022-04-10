import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error('Missing environment variable: MONGO_URI');
}

const connect = async () => {
  await mongoose.connect(MONGO_URI);
  console.info('Connected to database');
};

export default connect;
