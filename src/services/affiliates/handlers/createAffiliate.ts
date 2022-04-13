import * as validators from '../validators';
import { Affiliate } from '../../../db';

import type { AffiliateAttributes } from 'types';

const createAffiliate = async (data: AffiliateAttributes) => {
  validators.validate(validators.name, data);
  const affiliate = new Affiliate(data);
  return affiliate.save();
};

export default createAffiliate;
