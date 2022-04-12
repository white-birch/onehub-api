import * as db from '../../../db/mongo';
import * as validators from '../validators';

import type { Affiliate as AffiliateType } from 'types';

const createAffiliate = async ({ name }: AffiliateType) => {
  validators.validate(validators.name, { name });

  const affiliate = await db.affiliates.create({ name });

  return affiliate._id?.toString();
};

export default createAffiliate;
