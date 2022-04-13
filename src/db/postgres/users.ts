import { User } from './models';

import type { User as UserType } from '../../types';

export const create = async (user: UserType): Promise<UserType> => {
  const createdUser = await User.create(user);
  return createdUser.toJSON();
};

export const deleteById = async (_id: string): Promise<void> => {
  await User.destroy({ where: { _id } });
};

export const find = async (user: Partial<UserType>): Promise<UserType[]> => {
  const users = await User.findAll({ where: user });
  return users.map((u) => u.toJSON());
};

export const findById = async (_id: string | undefined): Promise<UserType | undefined> => {
  const user = await User.findByPk(_id);
  return user ? user.toJSON() : undefined;
};

export const update = async (user: UserType): Promise<UserType | undefined> => {
  const [, affectedRows] = await User.update(user, { where: { _id: user._id }, returning: true });
  return affectedRows.length > 0 ? affectedRows[0].toJSON() : undefined;
};
