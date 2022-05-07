import { UnauthorizedError } from '../errors';
import { InviteType } from '../types';
import logger from './logger';

import type { Request } from 'express';
import type { TokenContext } from '../types';

export type AuthAddOn = (req: Request, context: TokenContext) => Promise<void>;
type MapRequest<ReturnType> = (req: Request) => Promise<ReturnType> | ReturnType;
type IsAffiliateAdmin = (mapRequest: MapRequest<string>) => AuthAddOn;
type IsOrganizationAdmin = (mapRequest: MapRequest<string>) => AuthAddOn;
type IsAdmin = (mapRequest: MapRequest<{ type: InviteType; id: string }>) => AuthAddOn;

export const isAffiliateAdmin: IsAffiliateAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const affiliateId = await mapRequest(req);
    const isAffiliateAdmin = await user.isAffiliateAdmin(affiliateId);

    if (!isAffiliateAdmin) {
      logger.warn({ message: 'User is not an affiliate or organization admin', affiliateId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isOrganizationAdmin: IsOrganizationAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const organizationId = await mapRequest(req);
    const isOrganizationAdmin = await user.isOrganizationAdmin(organizationId);

    if (!isOrganizationAdmin) {
      logger.warn({ message: 'User is not a organization admin', organizationId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isAdmin: IsAdmin = (mapRequest) => async (req, context) => {
  const { type, id } = await mapRequest(req);
  if (type === InviteType.Organization) await isOrganizationAdmin(() => id)(req, context);
  if (type === InviteType.Affiliate) await isAffiliateAdmin(() => id)(req, context);
};
