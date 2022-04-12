import { DataTypes, Model } from 'sequelize';
import { User } from '../../types';
import sequelize from './sequelize';

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
  {
    paranoid: true,
  }
);

export const createUser = async (user: User): Promise<User> => {
  const createdUser = await User.create({ ...user });
  return createdUser.toJSON();
};
