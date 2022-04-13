import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

import type { Affiliate } from '../../../types';

export default sequelize.define<Model<Affiliate>>(
  'Affiliate',
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);
