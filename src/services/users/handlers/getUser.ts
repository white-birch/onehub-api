import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getUser = async (userId: number) => {
  validators.validate(validators.id, { id: userId });

  const user = await User.findByPk(userId);

  if (!user) {
    logger.warn('User not found');
    throw new NotFoundError();
  }

  return user;
};

export default getUser;
