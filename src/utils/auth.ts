import { UnauthorizedError } from '../errors';
import { InviteType } from '../types';
import logger from './logger';

import type { Request } from 'express';
import type { TokenContext } from '../types';

export type AuthAddOn = (req: Request, context: TokenContext) => Promise<void>;
type IsAffiliateAdmin = (mapRequest: (req: Request) => string) => AuthAddOn;
type IsOrganizationAdmin = (mapRequest: (req: Request) => string) => AuthAddOn;
type IsAdmin = (mapRequest: (req: Request) => { type: InviteType; id: string }) => AuthAddOn;

export const isAffiliateAdmin: IsAffiliateAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const affiliateId = mapRequest(req);
    const isAffiliateAdmin = await user.isAffiliateAdmin(affiliateId);

    if (!isAffiliateAdmin) {
      logger.warn({ message: 'User is not an affiliate or organization admin', affiliateId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isOrganizationAdmin: IsOrganizationAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const organizationId = mapRequest(req);
    const isOrganizationAdmin = await user.isOrganizationAdmin(organizationId);

    if (!isOrganizationAdmin) {
      logger.warn({ message: 'User is not a organization admin', organizationId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isAdmin: IsAdmin = (mapRequest) => async (req, context) => {
  const { type, id } = mapRequest(req);
  if (type === InviteType.Organization) await isOrganizationAdmin(() => id)(req, context);
  if (type === InviteType.Affiliate) await isAffiliateAdmin(() => id)(req, context);
};
