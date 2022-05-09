import { Affiliate, AffiliateAddress } from '../../../db';
import * as validators from '../../../utils/validators';

import type { AffiliateAttributes } from '../../../db';

const createAffiliate = async ({ id, ...data }: AffiliateAttributes) => {
  await validators.validate([validators.name, validators.organizationId], data);
  const affiliate = new Affiliate(data, { include: [AffiliateAddress] });
  return affiliate.save();
};

export default createAffiliate;
