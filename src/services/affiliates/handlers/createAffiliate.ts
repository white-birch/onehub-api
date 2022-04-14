import * as validators from '../validators';
import { Affiliate, AffiliateAddress } from '../../../db';

import type { AffiliateAttributes } from '../../../db';

const createAffiliate = async (data: AffiliateAttributes) => {
  validators.validate(validators.name, data);
  const affiliate = new Affiliate(data, { include: [AffiliateAddress] });
  return affiliate.save();
};

export default createAffiliate;
