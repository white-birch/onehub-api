import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getAffiliate = async (affiliateId: string) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await Affiliate.findByPk(affiliateId);

  if (!affiliate) {
    logger.warn({ message: 'Affiliate not found', affiliateId });
    throw new NotFoundError();
  }

  return affiliate;
};

export default getAffiliate;
