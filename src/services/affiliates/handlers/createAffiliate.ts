import { Affiliate } from '../../../db';
import * as validators from '../validators';

import type { Affiliate as AffiliateType } from 'types';

const createAffiliate = async ({ name }: AffiliateType) => {
  validators.validate(validators.name, { name });

  const affiliate = new Affiliate({ name });
  await affiliate.save();

  return affiliate._id?.toString();
};

export default createAffiliate;
