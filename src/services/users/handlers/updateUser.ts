import { User } from '../../../db';
import { BadRequestError, NotFoundError } from '../../../errors';
import { hash } from '../../../utils/crypto';
import ErrorCode from '../../../utils/errorCodes';
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

  const usersWithEmail = await User.find({ email: user.email });

  if (usersWithEmail.some((u) => u._id?.toString() !== user._id?.toString())) {
    console.warn('User already exists with the given email address.');
    throw new BadRequestError([ErrorCode.EmailInUse]);
  }

  const userDocument = await User.findById(user._id);

  if (!userDocument) {
    console.warn('User not found');
    throw new NotFoundError();
  }

  user.password = user.password ? await hash(user.password) : userDocument.password;

  await userDocument.update(user);
};

export default updateUser;
