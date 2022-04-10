import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import { validateAffiliateId } from '../validators';

const getAffiliate = async (affiliateId: string) => {
  validateAffiliateId(affiliateId, 'Affiliate ID is invalid.');

  const affiliate = await Affiliate.findById(affiliateId);

  if (!affiliate) {
    const error = new NotFoundError('Affiliate not found');
    console.error(error);
    throw error;
  }

  return affiliate.toObject({ versionKey: false });
};

export default getAffiliate;
