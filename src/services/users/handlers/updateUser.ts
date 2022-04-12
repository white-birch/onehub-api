import * as db from '../../../db/postgres';
import { BadRequestError, NotFoundError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';
import * as validators from '../validators';

import type { User as UserType } from 'types';

const updateUser = async (user: UserType) => {
  validators.validate(
    {
      ...validators._id,
      ...validators.email,
      ...(user.password && validators.password),
      ...validators.role,
    },
    user
  );

  const usersWithEmail = await db.users.find({ email: user.email });

  if (usersWithEmail.some((u) => u._id?.toString() !== user._id?.toString())) {
    logger.warn({ message: 'User Already Exists', email: user.email });
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const userDocument = await db.users.findById(user._id);

  if (!userDocument) {
    logger.warn('User not found');
    throw new NotFoundError();
  }

  user.password = user.password ? await hash(user.password) : userDocument.password;

  await db.users.update(user);
};

export default updateUser;
