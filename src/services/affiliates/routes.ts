import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { AffiliateRole } from '../../types';
import { isAffiliateOrPortalAdmin, isPortalAdmin } from '../../utils/auth';
import { addUserToAffiliate, createAffiliate, getAffiliateUsers } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.post(
  '/affiliates',
  authMiddleware([isPortalAdmin((req) => req.body.portalId)]),
  nextOnError(async (req, res) => {
    const affiliate = await createAffiliate(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToAffiliate(affiliate, user, AffiliateRole.Admin);

    res.status(201).json(affiliate);
  })
);

router.get(
  '/affiliates/:affiliateId/users',
  authMiddleware([isAffiliateOrPortalAdmin((req) => req.params.affiliateId)]),
  nextOnError(async (req, res) => {
    const users = await getAffiliateUsers(req.params.affiliateId);
    res.status(200).json(users);
  })
);

export default router;
