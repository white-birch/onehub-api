import mongoose from 'mongoose';

import type { Affiliate } from 'types';

const schema = new mongoose.Schema<Affiliate>(
  {
    name: { type: String, required: true, minlength: 1 },
  },
  { timestamps: true }
);

const Affiliate = mongoose.model<Affiliate>('Affiliate', schema);

export const create = async (affiliate: Affiliate): Promise<Affiliate> => Affiliate.create(affiliate);

export const deleteById = async (_id: string): Promise<void> => {
  Affiliate.findByIdAndDelete(_id).exec();
};

export const find = async (affiliate: Partial<Affiliate>): Promise<Affiliate[]> => {
  const affiliates = await Affiliate.find(affiliate);
  return affiliates.map((a) => a.toJSON({ versionKey: false }));
};

export const findById = async (_id: string | undefined): Promise<Affiliate | undefined> => {
  const affiliate = await Affiliate.findById(_id);
  return affiliate ? affiliate.toJSON({ versionKey: false }) : undefined;
};

export const update = async (affiliate: Affiliate): Promise<Affiliate | undefined> => {
  const updatedAffiliate = await Affiliate.findByIdAndUpdate(affiliate._id, affiliate, { new: true });
  return updatedAffiliate ? updatedAffiliate.toJSON({ versionKey: false }) : undefined;
};
