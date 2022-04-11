import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const deleteAffiliate = async (affiliateId: string) => {
  validators.validate(validators._id, { _id: affiliateId });

  const affiliate = await Affiliate.findById(affiliateId);

  if (!affiliate) {
    logger.warn('Affiliate not found');
    throw new NotFoundError();
  }

  await affiliate.delete();
};

export default deleteAffiliate;
