import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import { validateAffiliateId, validateName } from '../validators';

import type { Affiliate as AffiliateType } from 'types';

const updateAffiliate = async (affiliate: AffiliateType) => {
  validateAffiliateId(affiliate._id, 'Affiliate ID is invalid.');
  validateName(affiliate.name, 'Affiliate name is invalid.');

  const affiliateDocument = await Affiliate.findById(affiliate._id);

  if (!affiliateDocument) {
    const error = new NotFoundError('Affiliate not found');
    console.error(error);
    throw error;
  }

  await affiliateDocument.update(affiliate);
};

export default updateAffiliate;
