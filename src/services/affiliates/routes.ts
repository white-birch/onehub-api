import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { AffiliateRole } from '../../types';
import { isOrganizationAdmin } from '../../utils/auth';
import { addUserToAffiliate, createAffiliate, getAffiliates } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.get(
  '/affiliates',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const organizationId = req.query.organizationId as string;
    const { user } = httpContext.get('token') as TokenContext;
    const affiliates = await getAffiliates(organizationId, user);
    res.status(200).json(affiliates);
  })
);

router.post(
  '/affiliates',
  authMiddleware([isOrganizationAdmin((req) => req.query.organizationId as string)]),
  nextOnError(async (req, res) => {
    const affiliate = await createAffiliate(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToAffiliate(affiliate, user, AffiliateRole.Admin);

    res.status(201).json(affiliate);
  })
);

export default router;
