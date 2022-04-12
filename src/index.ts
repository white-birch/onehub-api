import * as postgres from './db/postgres';
import * as server from './server';

(async () => {
  await postgres.connect();
  await server.start();
})();
