import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const deleteUser = async (userId: string) => {
  validators.validate(validators._id, { _id: userId });

  const user = await User.findById(userId);

  if (!user) {
    logger.warn('User not found');
    throw new NotFoundError();
  }

  await user.delete();
};

export default deleteUser;
