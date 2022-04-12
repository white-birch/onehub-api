import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

import type { Affiliate } from '../../types';

const Affiliate = sequelize.define<Model<Affiliate>>(
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

export const create = async (affiliate: Affiliate): Promise<Affiliate> => {
  const createdAffiliate = await Affiliate.create(affiliate);
  return createdAffiliate.toJSON();
};

export const deleteById = async (_id: string): Promise<void> => {
  await Affiliate.destroy({ where: { _id } });
};

export const find = async (affiliate: Partial<Affiliate>): Promise<Affiliate[]> => {
  const affiliates = await Affiliate.findAll({ where: affiliate });
  return affiliates.map((u) => u.toJSON());
};

export const findById = async (_id: string | undefined): Promise<Affiliate | undefined> => {
  const affiliate = await Affiliate.findByPk(_id);
  return affiliate ? affiliate.toJSON() : undefined;
};

export const update = async (affiliate: Affiliate): Promise<Affiliate | undefined> => {
  const [, affectedRows] = await Affiliate.update(affiliate, { where: { _id: affiliate._id }, returning: true });
  return affectedRows.length > 0 ? affectedRows[0].toJSON() : undefined;
};
