import { Affiliate } from './models';

import type { Affiliate as AffiliateType } from '../../types';

export const create = async (affiliate: AffiliateType): Promise<AffiliateType> => {
  const createdAffiliate = await Affiliate.create(affiliate);
  return createdAffiliate.toJSON();
};

export const deleteById = async (_id: string): Promise<void> => {
  await Affiliate.destroy({ where: { _id } });
};

export const find = async (affiliate: Partial<AffiliateType>): Promise<AffiliateType[]> => {
  const affiliates = await Affiliate.findAll({ where: affiliate });
  return affiliates.map((u) => u.toJSON());
};

export const findById = async (_id: string | undefined): Promise<AffiliateType | undefined> => {
  const affiliate = await Affiliate.findByPk(_id);
  return affiliate ? affiliate.toJSON() : undefined;
};

export const update = async (affiliate: AffiliateType): Promise<AffiliateType | undefined> => {
  const [, affectedRows] = await Affiliate.update(affiliate, { where: { _id: affiliate._id }, returning: true });
  return affectedRows.length > 0 ? affectedRows[0].toJSON() : undefined;
};
