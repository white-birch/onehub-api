import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

type Options = Parameters<typeof User.findByPk>[1];

const getUser = async (userId: string, options?: Options) => {
  validators.validate(validators.id, { id: userId });

  const user = await User.findByPk(userId, options);

  if (!user) {
    logger.warn({ message: 'User not found', userId });
    throw new NotFoundError();
  }

  return user;
};

export default getUser;
