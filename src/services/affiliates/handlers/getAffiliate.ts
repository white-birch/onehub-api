import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getAffiliate = async (affiliateId: number) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await Affiliate.findByPk(affiliateId);

  if (!affiliate) {
    logger.warn('Affiliate not found');
    throw new NotFoundError();
  }

  return affiliate;
};

export default getAffiliate;
