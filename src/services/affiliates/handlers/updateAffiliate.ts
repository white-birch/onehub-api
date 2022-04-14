import * as validators from '../validators';
import getAffiliate from './getAffiliate';

import type { AffiliateAttributes } from '../../../db';

const updateAffiliate = async (data: AffiliateAttributes) => {
  validators.validate({ ...validators._id, ...validators.name }, data);

  const affiliate = await getAffiliate(data._id as string);

  return affiliate.update(data);
};

export default updateAffiliate;
