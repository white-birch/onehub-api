import { User } from '../../../db';
import { BadRequestError, NotFoundError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import { validateEmail, validatePassword, validateRole, validateUserId } from '../validators';

import type { User as UserType } from 'types';

const updateUser = async (user: UserType) => {
  validateUserId(user._id, 'User ID is invalid.');
  validateEmail(user.email, 'User email is invalid.');
  validateRole(user.role, 'User role is invalid.');

  if (user.password) {
    validatePassword(user.password, 'User password is invalid.');
  }

  const usersWithEmail = await User.find({ email: user.email });

  if (usersWithEmail.some((u) => u._id?.toString() !== user._id?.toString())) {
    const error = new BadRequestError('User already exists with the given email address.');
    console.error(error);
    throw error;
  }

  const userDocument = await User.findById(user._id);

  if (!userDocument) {
    const error = new NotFoundError('User not found');
    console.error(error);
    throw error;
  }

  user.password = user.password ? await hash(user.password) : userDocument.password;

  await userDocument.update(user);
};

export default updateUser;
