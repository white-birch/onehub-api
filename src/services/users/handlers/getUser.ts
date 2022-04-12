import { omit } from 'lodash';
import * as db from '../../../db/postgres';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getUser = async (userId: string) => {
  validators.validate(validators._id, { _id: userId });

  const user = await db.users.findById(userId);

  if (!user) {
    logger.warn('User not found');
    throw new NotFoundError();
  }

  return omit(user, 'password');
};

export default getUser;
