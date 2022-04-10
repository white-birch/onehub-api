import { Affiliate } from '../../../db';
import { validateName } from '../validators';

import type { Affiliate as AffiliateType } from 'types';

const createAffiliate = async ({ name }: AffiliateType) => {
  validateName(name, 'Name is invalid.');

  const affiliate = new Affiliate({ name });
  await affiliate.save();

  return affiliate._id?.toString();
};

export default createAffiliate;
