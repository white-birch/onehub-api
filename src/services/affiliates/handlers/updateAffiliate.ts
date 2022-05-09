import * as validators from '../../../utils/validators';
import getAffiliate from './getAffiliate';

import type { AffiliateAttributes, User } from 'db';

const updateAffiliate = async (affiliateId: string, { id, organizationId, ...data }: AffiliateAttributes, user: User) => {
  await validators.validate([validators.name], data);

  const affiliate = await getAffiliate(affiliateId, user);
  return affiliate.update(data);
};

export default updateAffiliate;
