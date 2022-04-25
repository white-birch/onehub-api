import { UnauthorizedError } from '../errors';
import logger from './logger';

import type { Request } from 'express';
import type { TokenContext } from '../types';

type AuthAddOn = (req: Request, context: TokenContext) => Promise<void>;
type IsAffiliateOrPortalAdmin = (mapRequest: (req: Request) => string) => AuthAddOn;
type IsPortalAdmin = (mapRequest: (req: Request) => string) => AuthAddOn;

export const isAffiliateOrPortalAdmin: IsAffiliateOrPortalAdmin =
  (mapRequest) =>
  async (req, { user }) => {
    const affiliateId = mapRequest(req);
    const isAffiliateOrPortalAdmin = await user.isAffiliateOrPortalAdmin(affiliateId);

    if (!isAffiliateOrPortalAdmin) {
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
