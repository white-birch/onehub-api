import { Affiliate } from '../../../db';
import * as validators from '../../organizations/validators';
import { getOrganization } from '../../organizations/handlers';

import type { User } from 'db';

const getAffiliates = async (organizationId: string, user: User) => {
  await validators.validate(validators.organizationId, { organizationId });

  const { affiliates } = await getOrganization(organizationId, { include: [Affiliate] });

  return affiliates.filter((affiliate) => user.affiliateUserRoles.some(({ affiliateId }) => affiliateId === affiliate.id));
};

export default getAffiliates;
