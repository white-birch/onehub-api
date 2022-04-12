import * as db from '../../../db/mongo';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const deleteAffiliate = async (affiliateId: string) => {
  validators.validate(validators._id, { _id: affiliateId });

  const affiliate = await db.affiliates.findById(affiliateId);

  if (!affiliate) {
    logger.warn('Affiliate not found');
    throw new NotFoundError();
  }

  await db.affiliates.deleteById(affiliateId);
};

export default deleteAffiliate;
