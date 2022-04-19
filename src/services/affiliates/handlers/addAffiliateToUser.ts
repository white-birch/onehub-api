import { Affiliate, User, UserRole } from '../../../db';

import type { Role } from '../../../types';

const addAffiliateToUser = async (affiliate: Affiliate, user: User, role: Role) => {
  await user.$add('affiliates', affiliate);

  const userRole = new UserRole({ role, affiliateId: affiliate.id, userId: user.id });
  await userRole.save();
};

export default addAffiliateToUser;
