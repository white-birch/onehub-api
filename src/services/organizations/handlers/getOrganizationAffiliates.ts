import httpContext from 'express-http-context';
import { Affiliate } from '../../../db';
import { AffiliateRole } from '../../../types';
import * as validators from '../validators';
import { getOrganization } from '.';

import type { TokenContext } from 'types';

const getOrganizationAffiliates = async (organizationId: string) => {
  await validators.validate(validators.id, { id: organizationId });

  const { user } = httpContext.get('token') as TokenContext;
  const { affiliates } = await getOrganization(organizationId, { include: [Affiliate] });

  return affiliates.filter((affiliate) =>
    user.affiliateUserRoles.some(({ affiliateId, role }) => affiliateId === affiliate.id && role === AffiliateRole.Admin)
  );
};

export default getOrganizationAffiliates;
