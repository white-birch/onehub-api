import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { AffiliateRole } from '../../types';
import { isAffiliateAdmin, isOrganizationAdmin } from '../../utils/auth';
import { addUserToAffiliate, createAffiliate, deleteAffiliate, getAffiliate, getAffiliates, updateAffiliate } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.get(
  '/affiliates/:affiliateId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const affiliate = await getAffiliate(req.params.affiliateId);
    res.status(200).json(affiliate);
  })
);

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
  authMiddleware([isOrganizationAdmin((req) => req.body.organizationId as string)]),
  nextOnError(async (req, res) => {
    const affiliate = await createAffiliate(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToAffiliate(affiliate, user, AffiliateRole.Admin);

    res.status(201).json(affiliate);
  })
);

router.put(
  '/affiliates/:affiliateId',
  authMiddleware([isAffiliateAdmin(async (req) => req.params.affiliateId)]),
  nextOnError(async (req, res) => {
    const affiliate = await updateAffiliate(req.params.affiliateId, req.body);
    res.status(200).json(affiliate);
  })
);

router.delete(
  '/affiliates/:affiliateId',
  authMiddleware([isAffiliateAdmin(async (req) => req.params.affiliateId)]),
  nextOnError(async (req, res) => {
    await deleteAffiliate(req.params.affiliateId);
    res.sendStatus(200);
  })
);

export default router;
