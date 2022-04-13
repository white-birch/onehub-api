import * as db from './db';
import * as server from './server';

(async () => {
  await db.connect();
  await server.start();
})();
