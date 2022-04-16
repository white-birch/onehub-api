import { Affiliate, User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';

const addUserToAffiliate = async (userId: string, affiliateId: string) => {
  const [user, affiliate] = await Promise.all([User.findByPk(userId), Affiliate.findByPk(affiliateId)]);

  if (!user) {
    logger.warn({ message: 'User not found', userId });
    throw new NotFoundError();
  }
  if (!affiliate) {
    logger.warn({ message: 'Affiliate not found', affiliateId });
    throw new NotFoundError();
  }

  await user.$add('affiliates', affiliate);
};

export default addUserToAffiliate;
