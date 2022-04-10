import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import { validateAffiliateId } from '../validators';

const deleteAffiliate = async (affiliateId: string) => {
  validateAffiliateId(affiliateId, 'Affiliate ID is invalid.');

  const affiliate = await Affiliate.findById(affiliateId);

  if (!affiliate) {
    const error = new NotFoundError('Affiliate not found');
    console.error(error);
    throw error;
  }

  await affiliate.delete();
};

export default deleteAffiliate;
