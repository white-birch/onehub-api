import httpContext from 'express-http-context';
import { Affiliate } from '../../../db';
import { Role } from '../../../types';
import * as validators from '../validators';
import { getPortal } from '.';

import type { TokenContext } from 'types';

const getPortalAffiliates = async (portalId: string) => {
  validators.validate(validators.id, { id: portalId });

  const { user } = httpContext.get('token') as TokenContext;
  const { affiliates } = await getPortal(portalId, { include: [Affiliate] });

  return affiliates.filter((affiliate) => user.roles.some(({ affiliateId, role }) => affiliateId === affiliate.id && role === Role.Admin));
};

export default getPortalAffiliates;
