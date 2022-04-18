import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getUser = async (userId: string) => {
  validators.validate(validators.id, { id: userId });

  const user = await User.findByPk(userId);

  if (!user) {
    logger.warn({ message: 'User not found', userId });
    throw new NotFoundError();
  }

  return user;
};

export default getUser;
