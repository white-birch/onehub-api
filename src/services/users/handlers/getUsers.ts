import { omit } from 'lodash';
import { User } from '../../../db';

const getUsers = async () => {
  const users = await User.find({}).exec();
  return users.map((user) => omit(user.toObject({ versionKey: false }), 'password'));
};

export default getUsers;
