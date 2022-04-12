import { omit } from 'lodash';
import * as db from '../../../db/postgres';

const getUsers = async () => {
  const users = await db.users.find({});
  return users.map((user) => omit(user, 'password'));
};

export default getUsers;
