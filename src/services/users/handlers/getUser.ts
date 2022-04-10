import { omit } from 'lodash';
import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import { validateString } from '../../../utils/validators';

const getUser = async (userId: string) => {
  validateString(userId, 'User id is invalid.');

  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFoundError('User not found');
    console.error(error);
    throw error;
  }

  return omit(user.toObject({ versionKey: false }), 'password');
};

export default getUser;
