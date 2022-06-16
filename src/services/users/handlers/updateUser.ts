import { User } from '../../../db';
import { BadRequestError } from '../../../errors';
import ErrorCode from '../../../utils/errorCodes';
import { hash } from '../../../utils/hash';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';
import getUser from './getUser';

import type { UserAttributes } from 'db';

const updateUser = async (userId: string, { id, ...data }: UserAttributes, organizationId: string) => {
  validators.validate([validators.email, ...(data.password ? [validators.password] : [])], data);

  await validators.validate([validators.email, validators.password], data);

  const usersWithEmail = await User.findAll({ where: { email: data.email } });

  if (usersWithEmail.some((u) => u.id !== userId)) {
    logger.warn({ message: 'User already exists with email', email: data.email });
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const user = await getUser(userId, organizationId);

  user.update({
    ...data,
    password: data.password ? await hash(data.password) : user.getPassword(),
  });
};

export default updateUser;
