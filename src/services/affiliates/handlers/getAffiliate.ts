import { Affiliate } from '../../../db';
import { ForbiddenError, NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

import type { User } from '../../../db';

const getAffiliate = async (affiliateId: string, user: User) => {
  await validators.validate(validators.id, { id: affiliateId });

  const affiliate = await Affiliate.findByPk(affiliateId);

  if (!affiliate) {
    logger.warn({ message: 'Affiliate not found', affiliateId });
    throw new NotFoundError();
  }

  const isAuthorized = user.isAffiliateUser(affiliateId);
  if (!isAuthorized) {
    logger.warn({ message: 'User not authorized to get affiliate', affiliateId });
    throw new ForbiddenError();
  }

  return affiliate;
};

export default getAffiliate;
