import { Affiliate } from '../../../db';
import { filterAsync } from '../../../utils/arrayAsync';
import * as validators from '../../../utils/validators';
import { getOrganization } from '../../organizations/handlers';

import type { User } from 'db';

const getAffiliates = async (organizationId: string, user: User) => {
  await validators.validate(validators.organizationId, { organizationId });

  const { affiliates } = await getOrganization(organizationId, { include: [Affiliate] });

  return filterAsync<Affiliate>(affiliates, (affiliate) => user.isAffiliateUser(affiliate.id));
};

export default getAffiliates;
