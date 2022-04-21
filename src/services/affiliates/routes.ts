import { Router } from 'express';
import httpContext from 'express-http-context';
import { UnauthorizedError } from '../../errors';
import { authMiddleware, nextOnError } from '../../middleware';
import { AffiliateRole } from '../../types';
import logger from '../../utils/logger';
import { addUserToAffiliate, createAffiliate, getAffiliateUsers } from './handlers';

import type { Request } from 'express';
import type { TokenContext } from '../../types';

const isAffiliateOrPortalAdmin = async (req: Request, { user }: TokenContext) => {
  const { affiliateId } = req.params;
  const isAffiliateOrPortalAdmin = await user.isAffiliateOrPortalAdmin(affiliateId);

  if (!isAffiliateOrPortalAdmin) {
    logger.warn({ message: 'User is not an affiliate or portal admin', affiliateId, userId: user.id });
    throw new UnauthorizedError();
  }
};

const isPortalAdmin = async (req: Request, { user }: TokenContext) => {
  const { portalId } = req.body;
  if (!user.isPortalAdmin(portalId)) {
    logger.warn({ message: 'User is not a portal admin', portalId, userId: user.id });
    throw new UnauthorizedError();
  }
};

const router = Router();

router.post(
  '/affiliates',
  authMiddleware([isPortalAdmin]),
  nextOnError(async (req, res) => {
    const affiliate = await createAffiliate(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToAffiliate(affiliate, user, AffiliateRole.Admin);

    res.status(201).json(affiliate);
  })
);

router.get(
  '/affiliates/:affiliateId/users',
  authMiddleware([isAffiliateOrPortalAdmin]),
  nextOnError(async (req, res) => {
    const users = await getAffiliateUsers(req.params.affiliateId);
    res.status(200).json(users);
  })
);

export default router;
