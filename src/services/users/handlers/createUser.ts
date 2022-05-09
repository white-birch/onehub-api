import { User } from '../../../db';
import { BadRequestError } from '../../../errors';
import { hash } from '../../../utils/hash';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

import type { UserAttributes } from 'db';

const createUser = async ({ id, ...data }: UserAttributes) => {
  await validators.validate([validators.email, validators.password], data);

  const usersWithEmail = await User.findAll({ where: { email: data.email } });

  if (usersWithEmail.length > 0) {
    logger.warn('Email is already in use.');
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const user = new User({ ...data, password: await hash(data.password) });
  await user.save();
  return user;
};

export default createUser;
