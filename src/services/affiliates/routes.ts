import { Router } from 'express';
import httpContext from 'express-http-context';
import { UnauthorizedError } from '../../errors';
import { authMiddleware, nextOnError } from '../../middleware';
import { Role } from '../../types';
import logger from '../../utils/logger';
import { addAffiliateToPortal, addAffiliateToUser, createAffiliate, getAffiliateUsers } from './handlers';

import type { Request } from 'express';
import type { TokenContext } from '../../types';

const isAffiliateAdmin = (req: Request, { user }: TokenContext) => {
  const { affiliateId } = req.params;
  const affiliateAdmin = user.roles.some((role) => role.affiliateId === affiliateId && role.role === Role.Admin);

  if (!affiliateAdmin) {
    logger.warn({ message: 'User is not an affiliate admin', affiliateId, userId: user.id });
    throw new UnauthorizedError();
  }
};

const router = Router();

router.post(
  '/affiliates',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const affiliate = await createAffiliate(req.body);

    if (req.query.portalId) {
      await addAffiliateToPortal(affiliate.id, req.query.portalId as string);
    }

    const { user } = httpContext.get('token') as TokenContext;
    await addAffiliateToUser(affiliate, user, Role.Admin);

    res.status(201).json(affiliate);
  })
);

router.get(
  '/affiliates/:affiliateId/users',
  authMiddleware([isAffiliateAdmin]),
  nextOnError(async (req, res) => {
    const users = await getAffiliateUsers(req.params.affiliateId);
    res.status(200).json(users);
  })
);

export default router;
