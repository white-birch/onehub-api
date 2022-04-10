import { User } from '../../../db';
import { BadRequestError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import { validateEmail, validatePassword, validateRole } from '../validators';

import type { User as UserType } from 'types';

const createUser = async ({ email, password, role }: UserType) => {
  validateEmail(email, 'Email is invalid.');
  validatePassword(password, 'Password is invalid.');
  validateRole(role, 'Role is invalid.');

  const usersWithEmail = await User.find({ email });

  if (usersWithEmail.length > 0) {
    const error = new BadRequestError('Email is already in use.');
    console.error(error);
    throw error;
  }

  const hashedPassword = await hash(password);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();

  return user._id?.toString();
};

export default createUser;
