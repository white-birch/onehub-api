import * as db from '../../../db/postgres';
import { BadRequestError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';
import * as validators from '../validators';

import type { User as UserType } from 'types';

const createUser = async ({ email, password, role }: UserType) => {
  validators.validate({ ...validators.email, ...validators.password, ...validators.role }, { email, password, role });

  const usersWithEmail = await db.users.find({ email });

  if (usersWithEmail.length > 0) {
    logger.warn('Email is already in use.');
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const hashedPassword = await hash(password);
  const user = await db.users.create({ email, password: hashedPassword, role });

  return user._id?.toString();
};

export default createUser;
