import { User } from '../../../db';
import { BadRequestError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';
import * as validators from '../validators';

import type { User as UserType } from 'types';

const createUser = async ({ email, password, role }: UserType) => {
  validators.validate({ ...validators.email, ...validators.password, ...validators.role }, { email, password, role });

  const usersWithEmail = await User.find({ email });

  if (usersWithEmail.length > 0) {
    logger.warn('Email is already in use.');
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const hashedPassword = await hash(password);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();

  return user._id?.toString();
};

export default createUser;
