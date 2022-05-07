import * as validators from '../validators';
import getAffiliate from './getAffiliate';

import type { AffiliateAttributes } from 'db';

const updateAffiliate = async (affiliateId: string, { id, organizationId, ...data }: AffiliateAttributes) => {
  await validators.validate([validators.name], data);

  const affiliate = await getAffiliate(affiliateId);
  return affiliate.update(data);
};

export default updateAffiliate;
