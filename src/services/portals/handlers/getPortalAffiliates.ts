import httpContext from 'express-http-context';
import { Role } from '../../../types';
import * as validators from '../validators';
import { getPortal } from '.';

import type { TokenContext } from 'types';

const getPortalAffiliates = async (portalId: string) => {
  validators.validate(validators.id, { id: portalId });

  const { user } = httpContext.get('token') as TokenContext;
  const portal = await getPortal(portalId);
  const [affiliates, userRoles] = await Promise.all([portal.$get('affiliates'), user.$get('roles')]);

  return affiliates.filter((affiliate) => userRoles.some((role) => role.affiliateId === affiliate.id && role.role === Role.Admin));
};

export default getPortalAffiliates;
