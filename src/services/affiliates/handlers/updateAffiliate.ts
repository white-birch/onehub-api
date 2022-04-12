import * as db from '../../../db/mongo';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

import type { Affiliate as AffiliateType } from 'types';

const updateAffiliate = async (affiliate: AffiliateType) => {
  validators.validate({ ...validators._id, ...validators.name }, affiliate);

  const affiliateDocument = await db.affiliates.findById(affiliate._id);

  if (!affiliateDocument) {
    logger.warn('Affiliate not found');
    throw new NotFoundError();
  }

  await db.affiliates.update(affiliate);
};

export default updateAffiliate;
