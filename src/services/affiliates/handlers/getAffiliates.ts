import { Affiliate } from '../../../db';

const getAffiliates = async () => {
  const affiliates = await Affiliate.find({}).exec();
  return affiliates.map((affiliate) => affiliate.toObject({ versionKey: false }));
};

export default getAffiliates;
