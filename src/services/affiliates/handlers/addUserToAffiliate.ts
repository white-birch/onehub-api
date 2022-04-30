import { Affiliate, User, AffiliateUserRole } from '../../../db';
import { addUserToOrganization } from '../../organizations/handlers';

import type { AffiliateRole } from '../../../types';

const addUserToAffiliate = async (affiliate: Affiliate, user: User, role: AffiliateRole) => {
  const organization = await affiliate.$get('organization');

  if (!organization) {
    throw new Error(`Affiliate with id ${affiliate.id} has no organization`);
  }

  await addUserToOrganization(organization, user);

  await user.$add('affiliates', affiliate);

  const affiliateUserRole = new AffiliateUserRole({ role, affiliateId: affiliate.id, userId: user.id });
  await affiliateUserRole.save();
};

export default addUserToAffiliate;
