import { UnauthorizedError } from '../errors';
import { InviteType } from '../types';
import logger from './logger';

import type { Request } from 'express';
import type { TokenContext } from '../types';

export type AuthAddOn = (req: Request, context: TokenContext) => Promise<void>;
type IsAffiliateAdmin = (mapRequest: (req: Request) => string) => AuthAddOn;
type IsPortalAdmin = (mapRequest: (req: Request) => string) => AuthAddOn;
type IsAdmin = (mapRequest: (req: Request) => { type: InviteType; id: string }) => AuthAddOn;

export const isAffiliateAdmin: IsAffiliateAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const affiliateId = mapRequest(req);
    const isAffiliateAdmin = await user.isAffiliateAdmin(affiliateId);

    if (!isAffiliateAdmin) {
      logger.warn({ message: 'User is not an affiliate or portal admin', affiliateId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isPortalAdmin: IsPortalAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const portalId = mapRequest(req);
    const isPortalAdmin = user.isPortalAdmin(portalId);

    if (!isPortalAdmin) {
      logger.warn({ message: 'User is not a portal admin', portalId, userId: user.id });
      throw new UnauthorizedError();
    }
  };

export const isAdmin: IsAdmin = (mapRequest) => async (req, context) => {
  const { type, id } = mapRequest(req);
  if (type === InviteType.Portal) isPortalAdmin(() => id)(req, context);
  if (type === InviteType.Affiliate) isAffiliateAdmin(() => id)(req, context);
};
