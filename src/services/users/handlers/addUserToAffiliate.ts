import { Affiliate, User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';

const addUserToAffiliate = async (userId: string, affiliateId: string) => {
  const [user, affiliate] = await Promise.all([User.findByPk(userId), Affiliate.findByPk(affiliateId)]);

  if (!user) {
    logger.warn('User not found');
    throw new NotFoundError();
  }
  if (!affiliate) {
    logger.warn('Affiliate not found');
    throw new NotFoundError();
  }

  await user.$add('affiliates', affiliate);
};

export default addUserToAffiliate;
