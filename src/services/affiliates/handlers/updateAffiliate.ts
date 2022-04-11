import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import * as validators from '../validators';

import type { Affiliate as AffiliateType } from 'types';

const updateAffiliate = async (affiliate: AffiliateType) => {
  validators.validate({ ...validators._id, ...validators.name }, affiliate);

  const affiliateDocument = await Affiliate.findById(affiliate._id);

  if (!affiliateDocument) {
    console.warn('Affiliate not found');
    throw new NotFoundError();
  }

  await affiliateDocument.update(affiliate);
};

export default updateAffiliate;
