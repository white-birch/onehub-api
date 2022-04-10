import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import { validateString } from '../../../utils/validators';

const deleteUser = async (userId: string) => {
  validateString(userId, 'User id is invalid.');

  const user = await User.findById(userId);

  if (!user) {
    const error = new NotFoundError('User not found');
    console.error(error);
    throw error;
  }

  await user.delete();
};

export default deleteUser;
