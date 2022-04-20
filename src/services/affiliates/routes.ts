import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { Role } from '../../types';
import { addAffiliateToPortal, addAffiliateToUser, createAffiliate, getAffiliateUsers } from './handlers';

import type { TokenContext } from '../../types';

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
    if (user) {
      await addAffiliateToUser(affiliate, user, Role.Admin);
    }

    res.status(201).json(affiliate);
  })
);

router.put(
  '/affiliates/:affiliateId/portal/:portalId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { affiliateId, portalId } = req.params;
    await addAffiliateToPortal(affiliateId, portalId);
    res.sendStatus(200);
  })
);

router.get(
  '/affiliates/:affiliateId/users',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const users = await getAffiliateUsers(req.params.affiliateId);
    res.status(200).json(users);
  })
);

export default router;
