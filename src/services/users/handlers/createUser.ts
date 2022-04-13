import { User } from '../../../db';
import { BadRequestError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';
import * as validators from '../validators';

import type { UserAttributes } from 'types';

const createUser = async (data: UserAttributes) => {
  validators.validate({ ...validators.email, ...validators.password, ...validators.role }, data);

  const usersWithEmail = await User.findAll({ where: { email: data.email } });

  if (usersWithEmail.length > 0) {
    logger.warn('Email is already in use.');
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const hashedPassword = await hash(data.password);
  const user = new User({ ...data, password: hashedPassword });
  await user.save();
  return user;
};

export default createUser;
