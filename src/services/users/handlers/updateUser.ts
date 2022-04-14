import { User } from '../../../db';
import { BadRequestError, NotFoundError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';
import * as validators from '../validators';
import getUser from './getUser';

import type { UserAttributes } from 'types';

const updateUser = async (data: UserAttributes) => {
  validators.validate(
    {
      ...validators._id,
      ...validators.email,
      ...(data.password && validators.password),
      ...validators.roles,
    },
    data
  );

  const usersWithEmail = await User.findAll({ where: { email: data.email } });

  if (usersWithEmail.some((u) => u._id?.toString() !== data._id?.toString())) {
    logger.warn({ message: 'User Already Exists With Email', email: data.email });
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const user = await getUser(data._id as string);

  if (!user) {
    logger.warn('User not found');
    throw new NotFoundError();
  }

  user.update({
    ...data,
    password: data.password ? await hash(data.password) : user.getPassword(),
  });
};

export default updateUser;
