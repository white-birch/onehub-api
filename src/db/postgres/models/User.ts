import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

import type { User } from '../../../types';

export default sequelize.define<Model<User>>(
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
      type: DataTypes.STRING,
    },
  },
  { paranoid: true }
);
