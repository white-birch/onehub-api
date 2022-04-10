import * as database from './db';
import * as server from './server';

(async () => {
  await database.connect();
  await server.start();
})();
