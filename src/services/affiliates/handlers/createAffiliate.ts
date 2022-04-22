import * as validators from '../validators';
import { Affiliate, AffiliateAddress } from '../../../db';

import type { AffiliateAttributes } from '../../../db';

const createAffiliate = async ({ id, ...data }: AffiliateAttributes) => {
  await validators.validate([validators.name, validators.portalId], data);
  const affiliate = new Affiliate(data, { include: [AffiliateAddress] });
  return affiliate.save();
};

export default createAffiliate;
