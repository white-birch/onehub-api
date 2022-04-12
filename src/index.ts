import * as mongo from './db/mongo';
import * as postgres from './db/postgres';
import * as server from './server';

(async () => {
  await Promise.all([mongo.connect(), postgres.connect()]);
  await server.start();
})();
