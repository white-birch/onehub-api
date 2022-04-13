import * as validators from '../validators';

import type { AffiliateAttributes } from 'types';
import getAffiliate from './getAffiliate';

const updateAffiliate = async (data: AffiliateAttributes) => {
  validators.validate({ ...validators._id, ...validators.name }, data);

  const affiliate = await getAffiliate(data._id as string);

  return affiliate.update(data);
};

export default updateAffiliate;
