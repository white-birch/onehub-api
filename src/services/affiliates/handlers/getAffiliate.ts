import { Affiliate } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

type Options = Parameters<typeof Affiliate.findByPk>[1];

const getAffiliate = async (affiliateId: string, options?: Options) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await Affiliate.findByPk(affiliateId, options);

  if (!affiliate) {
    logger.warn({ message: 'Affiliate not found', affiliateId });
    throw new NotFoundError();
  }

  return affiliate;
};

export default getAffiliate;
