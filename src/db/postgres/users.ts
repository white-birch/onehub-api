import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

import type { User } from '../../types';

const User = sequelize.define<Model<User>>(
  'User',
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('USER', 'MANAGER', 'ADMIN'),
    },
  },
  { paranoid: true }
);

export const create = async (user: User): Promise<User> => {
  const createdUser = await User.create(user);
  return createdUser.toJSON();
};

export const deleteById = async (_id: string): Promise<void> => {
  await User.destroy({ where: { _id } });
};

export const find = async (user: Partial<User>): Promise<User[]> => {
  const users = await User.findAll({ where: user });
  return users.map((u) => u.toJSON());
};

export const findById = async (_id: string | undefined): Promise<User | undefined> => {
  const user = await User.findByPk(_id);
  return user ? user.toJSON() : undefined;
};

export const update = async (user: User): Promise<User | undefined> => {
  const updatedUser = await User.update(user, { where: { _id: user._id }, returning: true });
  return updatedUser ? updatedUser[1][0].toJSON() : undefined;
};
