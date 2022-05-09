import { UnauthorizedError } from '../errors';
import { InviteType } from '../types';
import { everyAsync } from './arrayAsync';
import logger from './logger';

import type { Request } from 'express';
import type { TokenContext } from '../types';

export type AuthAddOn = (req: Request, context: TokenContext) => Promise<void>;
type MapRequest<ReturnType> = (req: Request) => Promise<ReturnType> | ReturnType;
type IsAffiliateAdmin = (mapRequest: MapRequest<string | string[]>) => AuthAddOn;
type IsOrganizationAdmin = (mapRequest: MapRequest<string>) => AuthAddOn;
type IsAdminForInvite = (mapRequest: MapRequest<{ type: InviteType; id: string }>) => AuthAddOn;
type IsTrackAdmin = (mapRequest: MapRequest<string>) => AuthAddOn;

export const isAffiliateAdmin: IsAffiliateAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const affiliateId = await mapRequest(req);
    const affiliateIds = Array.isArray(affiliateId) ? affiliateId : [affiliateId];

    const isAdmin = await everyAsync(affiliateIds, (affiliateId) => user.isAffiliateAdmin(affiliateId));

    if (!isAdmin) {
      logger.warn({ message: 'User is not an affiliate or organization admin', affiliateId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isOrganizationAdmin: IsOrganizationAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const organizationId = await mapRequest(req);
    const isAdmin = await user.isOrganizationAdmin(organizationId);

    if (!isAdmin) {
      logger.warn({ message: 'User is not a organization admin', organizationId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isAdminForInvite: IsAdminForInvite = (mapRequest) => async (req, context) => {
  const { type, id } = await mapRequest(req);
  if (type === InviteType.Organization) await isOrganizationAdmin(() => id)(req, context);
  if (type === InviteType.Affiliate) await isAffiliateAdmin(() => id)(req, context);
};

export const isTrackAdmin: IsTrackAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const trackId = await mapRequest(req);
    const isAdmin = await user.isTrackAdmin(trackId);

    if (!isAdmin) {
      logger.warn({ message: 'User is not a track admin', trackId, userId: user.id });
      throw new UnauthorizedError();
    }
  };
