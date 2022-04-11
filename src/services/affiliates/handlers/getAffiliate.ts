import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import * as validators from '../validators';

const getAffiliate = async (affiliateId: string) => {
  validators.validate(validators._id, { _id: affiliateId });

  const affiliate = await Affiliate.findById(affiliateId);

  if (!affiliate) {
    console.warn('Affiliate not found');
    throw new NotFoundError();
  }

  return affiliate.toObject({ versionKey: false });
};

export default getAffiliate;
