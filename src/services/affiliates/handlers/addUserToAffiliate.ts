import { Affiliate, User, AffiliateUserRole } from '../../../db';

import type { AffiliateRole } from '../../../types';

const addUserToAffiliate = async (affiliate: Affiliate, user: User, role: AffiliateRole) => {
  await user.$add('affiliates', affiliate);

  const affiliateUserRole = new AffiliateUserRole({ role, affiliateId: affiliate.id, userId: user.id });
  await affiliateUserRole.save();
};

export default addUserToAffiliate;
