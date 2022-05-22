import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { isOrganizationAdmin } from '../../utils/auth';
import { addUserToAffiliate, createAffiliate, deleteAffiliate, getAffiliate, getAffiliates, updateAffiliate } from './handlers';

import { Role, TokenContext } from '../../types';

const router = Router();

router.get(
  '/affiliates/:affiliateId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    const affiliate = await getAffiliate(req.params.affiliateId, user);
    res.status(200).json(affiliate);
  })
);

router.get(
  '/affiliates',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { payload, user } = httpContext.get('token') as TokenContext;
    const affiliates = await getAffiliates(payload.organizationId, user);
    res.status(200).json(affiliates);
  })
);

router.post(
  '/affiliates',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload, user } = httpContext.get('token') as TokenContext;

    const affiliate = await createAffiliate({ ...req.body, organizationId: payload.organizationId });
    await addUserToAffiliate(affiliate, user, Role.Admin);

    res.status(201).json(affiliate);
  })
);

router.put(
  '/affiliates/:affiliateId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    const affiliate = await updateAffiliate(req.params.affiliateId, req.body, user);
    res.status(200).json(affiliate);
  })
);

router.delete(
  '/affiliates/:affiliateId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    await deleteAffiliate(req.params.affiliateId, user);
    res.sendStatus(200);
  })
);

export default router;
