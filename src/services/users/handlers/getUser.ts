import { omit } from 'lodash';
import { User } from '../../../db';
import { NotFoundError } from '../../../errors';
import * as validators from '../validators';

const getUser = async (userId: string) => {
  validators.validate(validators._id, { _id: userId });

  const user = await User.findById(userId);

  if (!user) {
    console.warn('User not found');
    throw new NotFoundError();
  }

  return omit(user.toObject({ versionKey: false }), 'password');
};

export default getUser;
